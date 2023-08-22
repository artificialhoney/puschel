import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Toy as BleToy, ToyService as BleToyService } from '@xx/core';
import { Repository } from 'typeorm';

import { Toy } from '../entities/toy.entity';

const queryOptions = {
  relations: {
    timelines: {
      rides: true,
      play: true,
    },
  },
};

@Injectable()
export class ToyService {
  private readonly logger = new Logger(ToyService.name);

  constructor(
    @InjectRepository(Toy)
    private toyRepository: Repository<Toy>,
    private bleToyService: BleToyService
  ) {
    this.bleToyService.on(BleToyService.EVENT_NAME, async (toy: BleToy) => {
      const d = await this.findOneByUuid(toy.peripheral.uuid);

      if (d) {
        return;
      }

      this.logger.log('Toy discovered', toy.peripheral.uuid);

      await this.create({
        uuid: toy.peripheral.uuid,
        name: toy.peripheral.advertisement.localName,
        type: toy.type,
      });
    });
  }

  create(toy: Partial<Toy>): Promise<Toy> {
    let entity = this.toyRepository.create();
    entity = this.toyRepository.merge(entity, toy);
    return this.toyRepository.save(entity);
  }

  async update(toy: Partial<Toy>): Promise<Toy> {
    const id = toy.id;
    await this.toyRepository.update({ id }, toy);
    return this.findOne(id);
  }

  async delete(id: number): Promise<Toy> {
    const entity = await this.toyRepository.findOneBy({ id });
    await this.remove(entity);
    return entity;
  }

  async remove(...toys: Toy[]): Promise<void> {
    await this.toyRepository.remove(toys);
  }

  findAll(): Promise<Toy[]> {
    return this.toyRepository.find({ ...queryOptions });
  }

  findOne(id: number): Promise<Toy | null> {
    return this.toyRepository.findOne({ where: { id }, ...queryOptions });
  }

  findOneByUuid(uuid: string): Promise<Toy | null> {
    return this.toyRepository.findOne({ where: { uuid }, ...queryOptions });
  }

  findOneByName(name: string): Promise<Toy | null> {
    return this.toyRepository.findOne({ where: { name }, ...queryOptions });
  }
}
