<template>
  <div class="w-full h-screen bg-slate-900 p-4 pb-28">
    <Editor/>
    <div class="flex justify-between p-4">
      <Logo/>
      <Timer/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import events from '~/composables/events';
import FinishedModal from '~/components/FinishedModal.vue';
import { Howl } from 'howler';
const sound = new Howl({
  src: ['/happykids.mp3']
})

@Component
export default class extends Vue {
  private totalTime: Date|null = null;

  mounted(): void {
    events.listen('timer::finished', (date: Date, number: number) => {
      this.showModal(FinishedModal, date, number);
      if (this.totalTime) {
        this.totalTime.setTime(this.totalTime.getTime() + date.getTime());
      } else {
        this.totalTime = date;
      }
    });

    events.listen('timer::all-finished', (date: Date, number: number) => {
      this.showModal(FinishedModal, date, number);
    });
  }

  showModal(modal: any, date: Date, number: number): void {
    this.$modal.show(modal, {
      date: date,
      number: number,
    }, {
      clickToClose: false,
    });

    sound.play();
  }
}
</script>
<style lang="scss">

</style>
