import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import crypto from 'crypto';

import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserActionGuard } from '../guards/user-action.guard';
import { UserService } from '../services/user.service';

@UseGuards(JwtAuthGuard)
@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  @UseGuards(new UserActionGuard())
  createUser(@Args('user', { type: () => UserDto }) user: UserDto) {
    return this.userService.create({
      ...user,
      password: crypto
        .createHash('md5')
        .update(user.password)
        .digest('hex')
        .toLowerCase(),
    });
  }

  @Mutation(() => User)
  @UseGuards(new UserActionGuard(false))
  async updateUser(@Args('user', { type: () => UserDto }) user: UserDto) {
    const existing = await this.userService.findOne(user.id);
    if (!existing) {
      throw new NotFoundException();
    }
    return this.userService.update({
      ...user,
      password: crypto
        .createHash('md5')
        .update(user.password)
        .digest('hex')
        .toLowerCase(),
    });
  }

  @Mutation(() => User)
  @UseGuards(new UserActionGuard())
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.delete(id);
  }

  @Query(() => [User])
  async findUsers() {
    const users = await this.userService.findAll();
    for (const user of users) {
      this.modifyUser(user);
    }
    return users;
  }

  @Query(() => User)
  async findUser(@Args('id', { type: () => Int }) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.modifyUser(user);
  }

  @Query(() => User)
  async findCurrentUser(@Context('req') req) {
    const userId = req.user!.user_id;
    return this.findUser(userId);
  }

  @Query(() => User)
  async findUserByUsername(
    @Args('username', { type: () => String }) username: string
  ) {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }
    return this.modifyUser(user);
  }

  private modifyUser(user: User) {
    user.ratings = user.ratings.sort((a, b) => +b.date - +a.date);
    return user;
  }
}
