import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Play } from '../entities/play.entity';

const queryOptions = {
  relations: {
    timelines: {
      toy: true,
      rides: {
        satisfier: true,
      },
    },
    runs: {
      ratings: {
        user: true,
      },
    },
  },
};

@Injectable()
export class PlayService {
  constructor(
    @InjectRepository(Play)
    private playRepository: Repository<Play>
  ) {}

  create(play: Partial<Play>): Promise<Play> {
    let entity = this.playRepository.create();
    entity = this.playRepository.merge(entity, play);
    return this.playRepository.save(entity);
  }

  async update(play: Partial<Play>): Promise<Play> {
    const id = play.id;
    await this.playRepository.update({ id }, play);
    return this.findOne(id);
  }

  async delete(id: number): Promise<Play> {
    const entity = await this.playRepository.findOneBy({ id });
    await this.remove(entity);
    return entity;
  }

  async remove(...plays: Play[]): Promise<void> {
    await this.playRepository.remove(plays);
  }

  findAll(): Promise<Play[]> {
    return this.playRepository.find(queryOptions);
  }

  findOne(id: number): Promise<Play | null> {
    return this.playRepository.findOne({
      where: { id },
      ...queryOptions,
    });
  }

  findOneByName(name: string): Promise<Play | null> {
    return this.playRepository.findOne({
      where: { name },
      ...queryOptions,
    });
  }
}
