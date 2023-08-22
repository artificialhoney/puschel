import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

const queryOptions = {
  relations: {
    ratings: {
      run: {
        play: true,
      },
    },
  },
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  create(user: Partial<User>): Promise<User> {
    let entity = this.userRepository.create();
    entity = this.userRepository.merge(entity, user);
    return this.userRepository.save(entity);
  }

  async update(user: Partial<User>): Promise<User> {
    const id = user.id;
    await this.userRepository.update({ id }, user);
    return this.findOne(id);
  }

  async delete(id: number): Promise<User> {
    const entity = await this.userRepository.findOneBy({ id });
    await this.remove(entity);
    return entity;
  }

  async remove(...users: User[]): Promise<void> {
    await this.userRepository.remove(users);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ ...queryOptions });
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }, ...queryOptions });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
      ...queryOptions,
    });
  }
}
