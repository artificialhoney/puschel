import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { Run } from '../entities/run.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PlayService } from '../services/play.service';
import { RunService } from '../services/run.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Run)
export class RunResolver {
  constructor(
    private runService: RunService,
    private playService: PlayService
  ) {}

  @Query(() => [Run])
  findRuns() {
    return this.runService.findAll();
  }

  @Query(() => Run)
  async findRun(@Args('id', { type: () => Int }) id: number) {
    const run = await this.runService.findOne(id);
    if (!run) {
      throw new NotFoundException();
    }
    return run;
  }

  @Query(() => [Run])
  async findRunsByPlay(@Args('name', { type: () => String }) name: string) {
    const play = await this.playService.findOneByName(name);
    if (!play) {
      throw new NotFoundException();
    }
    return this.runService.findAllByPlay(play);
  }
}
