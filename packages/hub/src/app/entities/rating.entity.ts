import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@puschel/models';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Run } from './run.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Rating extends models.Rating {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  declare id: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 6, scale: 2 })
  declare score: number;

  @Field(() => Int, { nullable: true })
  @Column()
  declare orgasms: number;

  @Field({ nullable: true })
  @Column('text')
  declare message: string;

  @Field({ nullable: true })
  @Column()
  declare date: Date;

  @Field(() => Run, { nullable: true })
  @ManyToOne(() => Run, (run) => run.ratings)
  declare run: Run;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.ratings)
  declare user: User;

  @Field(() => Int, { nullable: true })
  declare playId: number;

  @Field(() => Int, { nullable: true })
  declare userId: number;
}
