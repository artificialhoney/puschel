import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Play } from '../entities/play.entity';
import { Timeline } from '../entities/timeline.entity';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Timeline)
    private timelineRepository: Repository<Timeline>
  ) {}

  create(timeline: Partial<Timeline>): Promise<Timeline> {
    let entity = this.timelineRepository.create();
    entity = this.timelineRepository.merge(entity, timeline);
    return this.timelineRepository.save(entity);
  }

  async update(timeline: Partial<Timeline>): Promise<Timeline> {
    const id = timeline.id;
    await this.timelineRepository.update({ id }, timeline);
    return this.findOne(id);
  }

  async delete(id: number): Promise<Timeline> {
    const entity = await this.timelineRepository.findOneBy({ id });
    await this.remove(entity);
    return entity;
  }

  async remove(...timelines: Timeline[]): Promise<void> {
    await this.timelineRepository.remove(timelines);
  }

  findAll(): Promise<Timeline[]> {
    return this.timelineRepository.find();
  }

  findOne(id: number): Promise<Timeline | null> {
    return this.timelineRepository.findOne({
      where: { id },
    });
  }

  findAllByPlay(play: Play): Promise<Timeline[]> {
    return this.timelineRepository.find({
      where: { play: play },
      relations: {
        toy: true,
      },
    });
  }
}
