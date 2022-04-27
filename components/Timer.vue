<template>
  <div class="text-white text-7xl font-mono">{{ time }}</div>
</template>
<script lang="ts">
import { Component, On, Vue } from 'nuxt-property-decorator'
import events from '~/composables/events'

@Component
export default class Timer extends Vue {
  private time: string = '00:00:00';
  private startDate: Date = new Date();
  public difference: Date = new Date();
  private running: boolean = false;

  mounted(): void {
    this.startDate = new Date();
    this.difference = new Date();
    this.start();

    events.listen('test::passed', (number: number) => {
      this.stop();
      events.fire('timer::finished', this.difference, number);
    });

    events.listen('test::all-passed', (number: number) => {
      this.stop();
      events.fire('timer::all-finished', this.difference, number);
    });

    events.listen('timer::reset', this.reset);
  }

  start(): void {
    this.running = true;
    window.requestAnimationFrame(this.run);
  }

  stop(): void {
    this.running = false;
  }

  reset(): void {
    this.startDate = new Date();
    this.difference = new Date();
    this.start();
  }

  run(): void {
    this.difference.setTime(Date.now() - this.startDate.getTime());
    this.updateTime();

    if (this.running) {
      window.requestAnimationFrame(this.run);
    }
  }

  updateTime(): void {
    // const milliseconds = ('0'+Math.round(this.difference.getMilliseconds() / 10)).slice(-2);
    const seconds = ('0'+this.difference.getSeconds()).slice(-2);
    const minutes = ('0'+this.difference.getMinutes()).slice(-2);

    // this.time = `${minutes}:${seconds}:${milliseconds}`;
    this.time = `${minutes}:${seconds}`;
  }
}
</script>
