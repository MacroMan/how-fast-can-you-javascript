<template>
  <div class="text-center bg-gray-800 text-slate-50">
    <div class="p-4">
      <h2 class="text-4xl pb-4">Congratulations!</h2>
      <p>You completed challenge {{ number }} in {{ time }}</p>
    </div>
    <div class="vue-dialog-buttons">
      <a href="#" class="w-full p-3 hover:bg-gray-700" @click="next">On to the next challenge</a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import events from '~/composables/events'

@Component
export default class FinishedModal extends Vue {
  @Prop({ required: true }) readonly date!: Date;
  @Prop({ required: true }) readonly number!: number;

  get time (): string {
    const seconds = this.date.getSeconds();
    const minutes = this.date.getMinutes();
    const second = (seconds === 1) ? 'second' : 'seconds';
    const minute = (minutes === 1) ? 'minute' : 'minutes';

    if (minutes < 1) {
      return `${seconds} ${second}!`;
    }

    return `${minutes} ${minute} and ${seconds} ${second}`;
  }

  next(): void {
    events.fire('challenge::next');
    this.$emit('close');
  }
}
</script>
<style lang="scss">
.vue-dialog-button {
  padding-top: 0.5rem !important;
}
</style>
