import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { Satisfier, SmartWatch } from '../entities/satisfier.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SatisfierService } from '../services/satisfier.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Satisfier)
export class SatisfierResolver {
  constructor(private satisfierService: SatisfierService) {}

  @Query(() => [Satisfier])
  findSatisfiers() {
    return this.satisfierService.findAll();
  }

  @Query(() => Satisfier)
  async findSatisfier(@Args('id', { type: () => Int }) id: number) {
    const satisfier = await this.satisfierService.findOne(id);
    if (!satisfier) {
      throw new NotFoundException();
    }
    return satisfier;
  }

  @Query(() => [SmartWatch])
  findSmartWatches() {
    return Array.from(this.satisfierService.getSmartWatches().keys()).map(
      (uuid) => ({
        uuid,
        name: uuid,
      })
    );
  }
}
