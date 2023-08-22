import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@xx/models';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Run } from './run.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Rating extends models.Rating {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 6, scale: 2 })
  score: number;

  @Field(() => Int, { nullable: true })
  @Column()
  orgasms: number;

  @Field({ nullable: true })
  @Column('text')
  message: string;

  @Field({ nullable: true })
  @Column()
  date: Date;

  @Field(() => Run, { nullable: true })
  @ManyToOne(() => Run, (run) => run.ratings)
  run: Run;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @Field(() => Int, { nullable: true })
  playId: number;

  @Field(() => Int, { nullable: true })
  userId: number;
}
