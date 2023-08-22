import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ToyDto } from '../dtos/toy.dto';
import { Toy } from '../entities/toy.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ToyService } from '../services/toy.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Toy)
export class ToyResolver {
  constructor(private toyService: ToyService) {}

  @Mutation(() => Toy)
  async updateToy(@Args('toy', { type: () => ToyDto }) toy: ToyDto) {
    const existing = await this.toyService.findOne(toy.id);
    if (!existing) {
      throw new NotFoundException();
    }
    return this.toyService.update(toy);
  }

  @Query(() => [Toy])
  findToys() {
    return this.toyService.findAll();
  }

  @Query(() => Toy)
  async findToy(@Args('id', { type: () => Int }) id: number) {
    const toy = await this.toyService.findOne(id);
    if (!toy) {
      throw new NotFoundException();
    }
    return toy;
  }

  @Query(() => Toy)
  async findToyByName(@Args('name', { type: () => String }) name: string) {
    const toy = await this.toyService.findOneByName(name);
    if (!toy) {
      throw new NotFoundException();
    }
    return toy;
  }
}
