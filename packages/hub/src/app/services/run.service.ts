import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Play } from '../entities/play.entity';
import { Run } from '../entities/run.entity';

@Injectable()
export class RunService {
  constructor(
    @InjectRepository(Run)
    private runRepository: Repository<Run>
  ) {}

  create(run: Partial<Run>): Promise<Run> {
    let entity = this.runRepository.create();
    entity = this.runRepository.merge(entity, run);
    return this.runRepository.save(entity);
  }

  async update(run: Partial<Run>): Promise<Run> {
    const id = run.id;
    await this.runRepository.update({ id }, run);
    return this.findOne(id);
  }

  async delete(id: number): Promise<Run> {
    const entity = await this.runRepository.findOneBy({ id });
    await this.remove(entity);
    return entity;
  }

  async remove(...runs: Run[]): Promise<void> {
    await this.runRepository.remove(runs);
  }

  findAll(): Promise<Run[]> {
    return this.runRepository.find({ loadEagerRelations: true });
  }

  findOne(id: number): Promise<Run | null> {
    return this.runRepository.findOne({
      where: { id },
      relations: {
        play: true,
      },
    });
  }

  findActiveOneByPlay(play: Play): Promise<Run> {
    return this.runRepository.findOne({
      where: { play, active: true },
    });
  }

  findLastOneByPlay(play: Play) {
    return this.runRepository.findOne({
      where: { play },
      order: {
        startDate: 'DESC',
      },
    });
  }

  findActiveOne(): Promise<Run> {
    return this.runRepository.findOne({
      where: { active: true },
      relations: {
        play: {
          timelines: {
            rides: {
              satisfier: true,
            },
            toy: true,
          },
          runs: {
            ratings: {
              user: true,
            },
          },
        },
      },
    });
  }

  async findAllByPlay(play: Play) {
    return this.runRepository.find({
      where: { play },
      order: {
        startDate: 'DESC',
      },
    });
  }

  updateAll(run: Partial<Run>) {
    return this.runRepository.createQueryBuilder().update().set(run).execute();
  }
}
