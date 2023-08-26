import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartWatchService } from '@puschel/core';
import { Repository } from 'typeorm';

import { Ride } from '../entities/ride.entity';
import { Satisfier } from '../entities/satisfier.entity';

@Injectable()
export class SatisfierService {
  constructor(
    @InjectRepository(Satisfier)
    private satisfierRepository: Repository<Satisfier>,
    private smartWatchService: SmartWatchService
  ) {}

  create(satisfier: Partial<Satisfier>): Promise<Satisfier> {
    let entity = this.satisfierRepository.create();
    entity = this.satisfierRepository.merge(entity, satisfier);
    return this.satisfierRepository.save(entity);
  }

  async update(satisfier: Partial<Satisfier>): Promise<Satisfier> {
    const id = satisfier.id;
    await this.satisfierRepository.update({ id }, satisfier);
    return this.findOne(id);
  }

  async delete(id: number): Promise<Satisfier> {
    const entity = await this.satisfierRepository.findOneBy({ id });
    await this.remove(entity);
    return entity;
  }

  async remove(...satisfiers: Satisfier[]): Promise<void> {
    await this.satisfierRepository.remove(satisfiers);
  }

  findAll(): Promise<Satisfier[]> {
    return this.satisfierRepository.find();
  }

  findOne(id: number): Promise<Satisfier | null> {
    return this.satisfierRepository.findOneBy({ id });
  }

  findOneByRide(ride: Ride): Promise<Satisfier | null> {
    return this.satisfierRepository.findOneBy({ ride });
  }

  getSmartWatches() {
    return this.smartWatchService.smartWatches;
  }
}
