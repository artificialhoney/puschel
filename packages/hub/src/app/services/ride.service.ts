import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ride } from '../entities/ride.entity';
import { Timeline } from '../entities/timeline.entity';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private rideRepository: Repository<Ride>
  ) {}

  create(ride: Partial<Ride>): Promise<Ride> {
    let entity = this.rideRepository.create();
    entity = this.rideRepository.merge(entity, ride);
    return this.rideRepository.save(entity);
  }

  async update(ride: Partial<Ride>): Promise<Ride> {
    const id = ride.id;
    await this.rideRepository.update({ id }, ride);
    return this.findOne(id);
  }

  async delete(id: number): Promise<Ride> {
    const entity = await this.rideRepository.findOneBy({ id });
    await this.remove(entity);
    return entity;
  }

  async remove(...rides: Ride[]): Promise<void> {
    await this.rideRepository.remove(rides);
  }

  findAll(): Promise<Ride[]> {
    return this.rideRepository.find({ loadEagerRelations: true });
  }

  findOne(id: number): Promise<Ride | null> {
    return this.rideRepository.findOne({
      where: { id },
      relations: {
        satisfier: true,
      },
    });
  }

  findAllByTimeline(timeline: Timeline): Promise<Ride[]> {
    return this.rideRepository.find({
      where: { timeline },
      order: {
        index: 'ASC',
      },
      relations: {
        satisfier: true,
      },
    });
  }
}
