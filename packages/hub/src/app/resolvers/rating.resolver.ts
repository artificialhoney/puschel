import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RatingDto } from '../dtos/rating.dto';
import { Rating } from '../entities/rating.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserActionGuard } from '../guards/user-action.guard';
import { RatingService } from '../services/rating.service';
import { RunService } from '../services/run.service';
import { UserService } from '../services/user.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Rating)
export class RatingResolver {
  constructor(
    private ratingService: RatingService,
    private runService: RunService,
    private userService: UserService
  ) {}

  @Mutation(() => Rating)
  @UseGuards(new UserActionGuard(false, true))
  async createRating(
    @Context('req') req,
    @Args('rating', { type: () => RatingDto }) rating: RatingDto
  ) {
    const run = await this.runService.findOne(rating.runId);
    if (!run) {
      throw new NotFoundException();
    }
    const user = await this.userService.findOne(req.user!.user_id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.ratingService.create({
      ...rating,
      run,
      user,
      date: new Date(),
    });
  }

  @Mutation(() => Rating)
  deleteRating(@Args('id', { type: () => Int }) id: number) {
    return this.ratingService.delete(id);
  }

  @Query(() => [Rating])
  findRatings() {
    return this.ratingService.findAll();
  }

  @Query(() => Rating)
  async findRating(@Args('id', { type: () => Int }) id: number) {
    const rating = await this.ratingService.findOne(id);
    if (!rating) {
      throw new NotFoundException();
    }
    return rating;
  }
}
