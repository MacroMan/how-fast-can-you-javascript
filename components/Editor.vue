<template>
  <div class="w-full h-full flex border-8" :class="{ 'border-slate-900': !passes, 'border-green-700': passes }">
    <div id="editor" class="h-full w-1/2"> </div>
    <div id="test" class="h-full w-1/2"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import CodeFlask from 'codeflask';
import { tests } from '~/composables/code';
import events from '~/composables/events'

@Component
export default class Editor extends Vue {
  private editor: CodeFlask|null = null;
  private test: CodeFlask|null = null;
  private passes: boolean = false;
  private testNumber: number = 0;

  mounted (): void {
    this.editor = new CodeFlask('#editor', {
      language: 'js',
      lineNumbers: true
    });

    this.editor.updateCode(tests[this.testNumber].description);
    this.editor.onUpdate(this.onUpdate);

    this.test = new CodeFlask('#test', {
      language: 'js',
      lineNumbers: true,
      readonly: true
    });

    this.updateResults();

    events.listen('challenge::next', this.loadNextChallenge);
  }

  updateResults(): void {
    let output = 'Test results\n\n';
    tests[this.testNumber].data.forEach((test: any) => {
      let status = (test.status) ? ' Passed!' : ' Fail';
      output += 'input: ' + JSON.stringify(test.input) + status + '\n';
    });

    this.test?.updateCode(output);
    // @ts-ignore
    this.passes = !Boolean(tests[this.testNumber].data.filter((test: any) => !test.status).length);

    if (this.passes) {
      events.fire((this.testNumber === tests.length-1) ? 'test::all-passed' : 'test::passed', this.testNumber+1);
    }
  }

  onUpdate (code: string): void {
    try {
      tests[this.testNumber].data.forEach((test: any) => {
        test.status = JSON.stringify(test.output) === JSON.stringify(Function('"use strict";return (' + code + ')')()(test.input));
      });
    } catch (e) {
      tests[this.testNumber].data.forEach((test: any) => {
        test.status = false;
      });
    }

    this.updateResults();
  }

  loadNextChallenge(): void {
    events.fire('timer::reset');
    this.testNumber++;
    this.editor?.updateCode(tests[this.testNumber].description);
    this.updateResults();
  }

  reset(): void {

  }
}
</script>
<style lang="scss">
#editor, #test {
  .codeflask {
      position: relative;
  }
}
</style>
