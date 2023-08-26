import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AiService, RideEventData } from '@puschel/ai';
import {
  SmartWatchEvent,
  SmartWatchService,
  Toy,
  ToyService as BleToyService,
} from '@puschel/core';
import { generateFromHeartRate, SatisfierType } from '@puschel/models';
import { generatePeak, generateRandom } from '@puschel/models';

import { Ride } from '../entities/ride.entity';
import { RideEvent } from '../entities/ride-event.entity';
import { Run } from '../entities/run.entity';
import { Timeline } from '../entities/timeline.entity';
import { PlayService } from './play.service';
import { RideService } from './ride.service';
import { RideEventService } from './ride-event.service';
import { RunService } from './run.service';
import { TimelineService } from './timeline.service';

@Injectable()
export class PlayTaskService {
  private static RIDE_EVENT_INTERVAL = 1000;

  private logger = new Logger(PlayTaskService.name);

  private lastSmartWatchEvents: Map<string, SmartWatchEvent> = new Map<
    string,
    SmartWatchEvent
  >();

  constructor(
    private playService: PlayService,
    private timelineService: TimelineService,
    private runService: RunService,
    private bleToyService: BleToyService,
    private rideService: RideService,
    private rideEventService: RideEventService,
    private smartWatchService: SmartWatchService,
    private aiService: AiService
  ) {
    this.smartWatchService.on(SmartWatchService.EVENT_NAME, (event) =>
      this.handleSmartWatchEvent(event)
    );
  }

  @Cron(CronExpression.EVERY_SECOND)
  async run() {
    try {
      await this.handleActiveRun();
    } catch (e) {
      this.logger.error(e);
    }
  }

  private async handleActiveRun() {
    const run = await this.runService.findActiveOne();
    if (!run) {
      for (const toy of this.bleToyService.toys.values()) {
        if (toy.peripheral && toy.peripheral.state === 'connected') {
          await toy.disconnect();
        }
      }
      return;
    }

    const timelines = await this.timelineService.findAllByPlay(run.play);

    let active = false;
    for (const timeline of timelines) {
      active = await this.handleTimeline(timeline, run);
    }

    if (!active) {
      await this.runService.update({
        ...run,
        active: false,
      });
      return;
    }

    run.runTime = run.runTime + 1000;
    await this.runService.update(run);
  }

  private async handleTimeline(timeline: Timeline, run: Run, newToy?: Toy) {
    const toy = newToy || this.bleToyService.toys.get(timeline.toy.uuid);

    if (!toy) {
      return false;
    }

    const rides = await this.rideService.findAllByTimeline(timeline);
    let offset = 0;
    const ride = rides.find((r) => {
      offset = rides.slice(0, r.index).reduce((agg, r) => agg + r.length, 0);
      return run.runTime >= offset && run.runTime < r.length + offset;
    });

    if (!ride) {
      return false;
    }
    return await this.handleRide(toy, ride, run, offset);
  }

  private async handleRide(toy: Toy, ride: Ride, run: Run, offset: number) {
    const settings =
      ride.satisfier.settings && JSON.parse(ride.satisfier.settings);
    const lastEvent = await this.rideEventService.findLastOneByRun(run);

    if (
      lastEvent &&
      new Date().getTime() - lastEvent.date.getTime() <=
        (settings?.interval
          ? settings.interval
          : PlayTaskService.RIDE_EVENT_INTERVAL) -
          1000
    ) {
      return true;
    }

    const event = new RideEvent();
    event.run = run;
    event.date = new Date();

    switch (ride.satisfier.type) {
      case SatisfierType.RANDOM:
        event.payload = {
          value: generateRandom(),
        };
        await this.handleRideEvent(event, toy, ride);
        return true;
      case SatisfierType.PEAK:
        const x = run.runTime - offset;
        const v =
          (generatePeak(settings.easing, x / ride.length) *
            (settings.end - settings.start)) /
          10;
        event.payload = {
          value: Math.abs(v + settings.start / 10),
        };
        await this.handleRideEvent(event, toy, ride);
        return true;
      case SatisfierType.MANUAL:
        if (lastEvent) {
          await this.handleRideEvent(lastEvent, toy, ride, false);
        }
        return true;

      case SatisfierType.AI:
        if (run.runTime === 0) {
          return true;
        }
        let events: RideEvent[] = [];
        for (const playId of settings.playIds) {
          const r = await this.runService.findLastOneByPlay(
            await this.playService.findOne(playId)
          );
          if (!r || r.active || r.id === run.id) {
            continue;
          }
          const newEvents = (await this.rideEventService.findAllByRun(r)).map(
            (e) => ({
              ...e,
              date: new Date(+e.date - +r.startDate),
            })
          );
          events = [...events, ...newEvents];
        }
        events = events.sort((a, b) => +a.date - +b.date);
        // const distance = +events[events.length - 1].date - +events[0].date;
        const data = new RideEventData(
          RideEventData.toData(events.filter((e) => +e.date < run.runTime))
        );
        if (data.data.length === 0) {
          return false;
        }
        const aiModel = await this.aiService.buildModel(data);
        const result = (await this.aiService.makePredictions(
          aiModel,
          data
        )) as any;
        event.payload = {
          value: Math.max(0, Math.min(result[0], 1)),
        };
        await this.handleRideEvent(event, toy, ride);
        return true;
      case SatisfierType.REPLAY:
        const replayRun = await this.runService.findOne(settings.runId);
        if (!replayRun) {
          return false;
        }

        const replayTimeline = (
          await this.timelineService.findAllByPlay(settings.playId)
        ).find((t) => t.id === settings.timelineId);
        if (!replayTimeline) {
          return false;
        }

        const rides = await this.rideService.findAllByTimeline(replayTimeline);
        const replayRide = rides.find((r) => {
          offset = rides
            .slice(0, r.index)
            .reduce((agg, r) => agg + r.length, 0);
          return run.runTime >= offset && run.runTime < r.length + offset;
        });
        if (!replayRide) {
          return false;
        }

        const date = replayRun.startDate.getTime() + run.runTime;
        const replayEvent = await this.rideEventService.findOneByRunAndDate(
          replayRun,
          new Date(date)
        );
        if (!replayEvent) {
          return false;
        }

        event.payload = replayEvent.payload && JSON.parse(replayEvent.payload);
        await this.handleRideEvent(event, toy, ride);
        return true;
      case SatisfierType.SMART_WATCH:
        if (!this.lastSmartWatchEvents.has(settings.uuid)) {
          return true;
        }
        event.payload = {
          value: generateFromHeartRate(
            this.lastSmartWatchEvents.get(settings.uuid).payload.hrm.bpm
          ),
        };
        this.lastSmartWatchEvents.set(settings.uuid, undefined);
        await this.handleRideEvent(event, toy, ride);
        return true;
    }
  }

  private async handleRideEvent(event, toy, ride, persist = true) {
    await toy.write(event, ride.toyAssignment);

    if (!persist) {
      return;
    }

    await this.rideEventService.create({
      ...event,
      payload: JSON.stringify(event.payload),
    });
  }

  private handleSmartWatchEvent(event: SmartWatchEvent) {
    this.lastSmartWatchEvents.set(event.uuid, event);
  }
}
