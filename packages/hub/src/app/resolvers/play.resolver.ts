import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PlayDto } from '../dtos/play.dto';
import { Play } from '../entities/play.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PlayService } from '../services/play.service';
import { RatingService } from '../services/rating.service';
import { RideService } from '../services/ride.service';
import { RideEventService } from '../services/ride-event.service';
import { RunService } from '../services/run.service';
import { SatisfierService } from '../services/satisfier.service';
import { TimelineService } from '../services/timeline.service';
import { ToyService } from '../services/toy.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Play)
export class PlayResolver {
  constructor(
    private playService: PlayService,
    private timelineService: TimelineService,
    private rideService: RideService,
    private runService: RunService,
    private satisfierService: SatisfierService,
    private rideEventService: RideEventService,
    private toyService: ToyService,
    private ratingService: RatingService
  ) {}

  @Mutation(() => Play)
  async startPlay(@Args('id', { type: () => Int }) id: number) {
    await this.runService.updateAll({ active: false });

    const play = await this.playService.findOne(id);

    if (!play) {
      throw new NotFoundException();
    }

    await this.runService.create({
      play: play,
      active: true,
      paused: false,
      startDate: new Date(),
    });

    return this.modifyPlay(play);
  }

  @Mutation(() => Play)
  async stopPlay(@Args('id', { type: () => Int }) id: number) {
    const play = await this.playService.findOne(id);
    if (!play) {
      throw new NotFoundException();
    }
    const run = await this.runService.findActiveOneByPlay(play);
    if (run) {
      await this.runService.update({ ...run, active: false });
    }

    return this.modifyPlay(play);
  }

  @Mutation(() => Play)
  async createPlay(@Args('play', { type: () => PlayDto }) play: PlayDto) {
    const p = await this.playService.create({
      name: play.name,
      description: play.description,
    });
    p.timelines = [];
    for (const timeline of play.timelines) {
      const t = await this.toyService.findOne(timeline.toyId);
      const tl = await this.timelineService.create({
        toy: t,
        play: p,
      });

      tl.rides = [];
      for (const ride of timeline.rides) {
        const s = await this.satisfierService.create({
          type: ride.satisfier.type,
          settings:
            ride.satisfier.settings && JSON.stringify(ride.satisfier.settings),
        });

        const r = await this.rideService.create({
          enabled: ride.enabled,
          index: ride.index,
          length: ride.length,
          toyAssignment: ride.toyAssignment,
          timeline: tl,
          satisfier: s,
        });
        s.ride = r;
        tl.rides.push(r);
      }
    }
    return p;
  }

  @Mutation(() => Play)
  async updatePlay(@Args('play', { type: () => PlayDto }) play: PlayDto) {
    const existing = await this.playService.findOne(play.id);
    if (!existing) {
      throw new NotFoundException();
    }
    const p = await this.playService.update({
      id: play.id,
      name: play.name,
      description: play.description,
    });
    const timelines = await this.timelineService.findAllByPlay(p);
    for (const timeline of timelines) {
      const rides = await this.rideService.findAllByTimeline(timeline);
      for (const ride of rides) {
        await this.rideService.delete(ride.id);
        await this.satisfierService.delete(ride.satisfier.id);
      }
      await this.timelineService.delete(timeline.id);
    }
    p.timelines = [];
    for (const timeline of play.timelines) {
      const t = await this.toyService.findOne(timeline.toyId);
      const tl = await this.timelineService.create({
        toy: t,
        play: p,
      });

      tl.rides = [];
      for (const ride of timeline.rides) {
        const s = await this.satisfierService.create({
          type: ride.satisfier.type,
          settings:
            ride.satisfier.settings && JSON.stringify(ride.satisfier.settings),
        });

        const r = await this.rideService.create({
          enabled: ride.enabled,
          index: ride.index,
          length: ride.length,
          toyAssignment: ride.toyAssignment,
          timeline: tl,
          satisfier: s,
        });
        s.ride = r;
        tl.rides.push(r);
      }
    }

    const runs = await this.runService.findAllByPlay(p);
    for (const run of runs) {
      const events = await this.rideEventService.findAllByRun(run);
      await this.rideEventService.remove(...events);
      const ratings = await this.ratingService.findAllByRun(run);
      await this.ratingService.remove(...ratings);
    }
    await this.runService.remove(...runs);
    return p;
  }

  @Mutation(() => Play)
  async deletePlay(@Args('id', { type: () => Int }) id: number) {
    const play = await this.playService.findOne(id);
    if (!play) {
      throw new NotFoundException();
    }
    const timelines = await this.timelineService.findAllByPlay(play);
    for (const timeline of timelines) {
      const rides = await this.rideService.findAllByTimeline(timeline);
      for (const ride of rides) {
        await this.rideService.delete(ride.id);
        await this.satisfierService.delete(ride.satisfier.id);
      }
      await this.timelineService.delete(timeline.id);
    }
    return this.playService.delete(id);
  }

  @Query(() => [Play])
  async findPlays() {
    const plays = await this.playService.findAll();
    for (const play of plays) {
      this.modifyPlay(play);
    }

    return plays;
  }

  @Query(() => Play)
  async findPlay(@Args('id', { type: () => Int }) id: number) {
    const play = await this.playService.findOne(id);
    if (!play) {
      throw new NotFoundException();
    }
    return this.modifyPlay(play);
  }

  @Query(() => Play)
  async findPlayByName(@Args('name', { type: () => String }) name: string) {
    const play = await this.playService.findOneByName(name);
    if (!play) {
      throw new NotFoundException();
    }

    return this.modifyPlay(play);
  }

  @Query(() => Play, { nullable: true })
  async findActivePlay() {
    const play = (await this.runService.findActiveOne())?.play;
    if (!play) {
      return null;
    }

    return this.modifyPlay(play);
  }

  private modifyPlay(play: Play) {
    for (const timeline of play.timelines) {
      timeline.toyId = timeline.toy.id;
    }

    play.runs = play.runs.sort((a, b) => +b.startDate - +a.startDate);

    for (const run of play.runs) {
      for (const rating of run.ratings) {
        rating.userId = rating.user.id;
      }
    }
    return play;
  }
}
