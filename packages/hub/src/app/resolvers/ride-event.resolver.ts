import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RideEventDto } from '../dtos/ride-event.dto';
import { RideEvent } from '../entities/ride-event.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RideService } from '../services/ride.service';
import { RideEventService } from '../services/ride-event.service';
import { RunService } from '../services/run.service';
import { TimelineService } from '../services/timeline.service';

@UseGuards(JwtAuthGuard)
@Resolver((of) => RideEvent)
export class RideEventResolver {
  constructor(
    private rideEventService: RideEventService,
    private rideService: RideService,
    private runService: RunService,
    private timelineService: TimelineService
  ) {}

  @Mutation(() => RideEvent)
  async createRideEvent(
    @Args('event', { type: () => RideEventDto }) event: RideEventDto
  ) {
    const run = await this.runService.findActiveOne();
    return this.rideEventService.create({
      ...event,
      payload: event.payload && JSON.stringify(event.payload),
      run,
      date: new Date(),
    });
  }

  @Query(() => [RideEvent])
  findRideEvents() {
    return this.rideEventService.findAll();
  }

  @Query(() => RideEvent)
  async findRideEvent(@Args('id', { type: () => Int }) id: number) {
    const rideEvent = await this.rideEventService.findOne(id);
    if (!rideEvent) {
      throw new NotFoundException();
    }
    return rideEvent;
  }

  @Query(() => RideEvent, { nullable: true })
  async findLastRideEventByRun(@Args('id', { type: () => Int }) id: number) {
    const run = await this.runService.findOne(id);
    if (!run) {
      throw new NotFoundException();
    }
    return this.rideEventService.findLastOneByRun(run);
  }
}
