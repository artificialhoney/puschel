import { RideEvent } from '@xx/models';

export class RideEventData {
  constructor(public readonly data: { timestamp: Date; value: number }[]) {}

  static toData(events: RideEvent[]): { timestamp: Date; value: number }[] {
    const data = [];
    for (const event of events) {
      data.push({
        timestamp: event.date,
        value:
          typeof event.payload === 'string'
            ? JSON.parse(event.payload).value
            : event.payload.value,
      });
    }
    return data;
  }

  computeSMA(windowSize) {
    const r_avgs = [];
    for (let i = 0; i <= this.data.length - windowSize; i++) {
      let curr_avg = 0.0;
      const t = i + windowSize;
      for (let k = i; k < t && k <= this.data.length; k++) {
        curr_avg += this.data[k].value / windowSize;
      }
      r_avgs.push({ set: this.data.slice(i, i + windowSize), avg: curr_avg });
    }
    return r_avgs;
  }
}
