import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { Ride } from '../entities/ride.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RideService } from '../services/ride.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Ride)
export class RideResolver {
  constructor(private rideService: RideService) {}

  @Query(() => [Ride])
  findRides() {
    return this.rideService.findAll();
  }

  @Query(() => Ride)
  async findRide(@Args('id', { type: () => Int }) id: number) {
    const ride = await this.rideService.findOne(id);
    if (!ride) {
      throw new NotFoundException();
    }
    return ride;
  }
}
