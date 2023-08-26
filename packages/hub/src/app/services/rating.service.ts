import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Run } from '@puschel/models';
import { Repository } from 'typeorm';

import { Rating } from '../entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>
  ) {}

  create(rating: Partial<Rating>): Promise<Rating> {
    let entity = this.ratingRepository.create();
    entity = this.ratingRepository.merge(entity, rating);
    return this.ratingRepository.save(entity);
  }

  async update(rating: Partial<Rating>): Promise<Rating> {
    const id = rating.id;
    await this.ratingRepository.update({ id }, rating);
    return this.findOne(id);
  }

  async delete(id: number): Promise<Rating> {
    const entity = await this.ratingRepository.findOneBy({ id });
    await this.remove(entity);
    return entity;
  }

  async remove(...ratings: Rating[]): Promise<void> {
    await this.ratingRepository.remove(ratings);
  }

  findAll(): Promise<Rating[]> {
    return this.ratingRepository.find();
  }

  findAllByRun(run: Run) {
    return this.ratingRepository.findBy({ run });
  }

  findOne(id: number): Promise<Rating | null> {
    return this.ratingRepository.findOneBy({ id });
  }
}
