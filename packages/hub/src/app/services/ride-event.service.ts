import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';

import { RideEvent } from '../entities/ride-event.entity';
import { Run } from '../entities/run.entity';

@Injectable()
export class RideEventService {
  constructor(
    @InjectRepository(RideEvent)
    private rideEventRepository: Repository<RideEvent>
  ) {}

  create(rideEvent: Partial<RideEvent>): Promise<RideEvent> {
    let entity = this.rideEventRepository.create();
    entity = this.rideEventRepository.merge(entity, rideEvent);
    return this.rideEventRepository.save(entity);
  }

  async update(rideEvent: Partial<RideEvent>): Promise<RideEvent> {
    const id = rideEvent.id;
    await this.rideEventRepository.update({ id }, rideEvent);
    return this.findOne(id);
  }

  async delete(id: number): Promise<RideEvent> {
    const entity = await this.rideEventRepository.findOneBy({ id });
    await this.remove(entity);
    return entity;
  }

  async remove(...rideEventss: RideEvent[]): Promise<void> {
    await this.rideEventRepository.remove(rideEventss);
  }

  findAll(): Promise<RideEvent[]> {
    return this.rideEventRepository.find();
  }

  findLastOneByRun(run: Run): Promise<RideEvent> {
    return this.rideEventRepository.findOne({
      where: { run },
      order: {
        date: 'DESC',
      },
    });
  }

  findOneByRunAndDate(run: Run, date: Date): Promise<RideEvent> {
    return this.rideEventRepository.findOne({
      where: { run, date: MoreThanOrEqual(date) },
      order: {
        date: 'ASC',
      },
    });
  }

  findFirstOneForRun(run: Run): Promise<RideEvent> {
    return this.rideEventRepository.findOne({
      where: { run },
      order: {
        date: 'ASC',
      },
    });
  }

  findAllByRun(run: Run) {
    return this.rideEventRepository.findBy({ run });
  }

  findOne(id: number): Promise<RideEvent | null> {
    return this.rideEventRepository.findOneBy({ id });
  }
}
