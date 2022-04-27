<template>
  <div class="text-center bg-gray-800 text-slate-50">
    <div class="p-4">
      <h2 class="text-4xl pb-4">Congratulations!</h2>
      <p>You completed the challenge in {{ time }}</p>
      <p>All challenges completed in {{ allTime }}</p>
    </div>
    <div class="vue-dialog-buttons">
      <a href="#" class="w-full p-3 hover:bg-gray-700" @click="next">Next</a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import events from '~/composables/events'

@Component
export default class FinishedModal extends Vue {
  @Prop({ required: true }) readonly date!: Date
  @Prop({ required: true }) readonly allDate!: Date
  @Prop({ required: true }) readonly number!: number;

  get time (): string {
    const seconds = ('0' + this.date.getSeconds()).slice(-2)
    const minutes = ('0' + this.date.getMinutes()).slice(-2)

    return `${minutes}:${seconds}`
  }

  get allTime(): string {
    const seconds = ('0' + this.date.getSeconds()).slice(-2)
    const minutes = ('0' + this.date.getMinutes()).slice(-2)

    return `${minutes}:${seconds}`
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
