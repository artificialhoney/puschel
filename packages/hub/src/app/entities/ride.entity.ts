import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@puschel/models';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Satisfier } from './satisfier.entity';
import { Timeline } from './timeline.entity';

@ObjectType()
@Entity()
export class Ride extends models.Ride {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  declare id: number;

  @Field(() => Boolean, { nullable: true })
  @Column()
  declare enabled: boolean;

  @Field(() => Int, { nullable: true })
  @Column()
  declare index: number;

  @Field(() => Int, { nullable: true })
  @Column()
  declare length: number;

  @Field(() => Timeline, { nullable: true })
  @ManyToOne(() => Timeline, (timeline) => timeline.rides)
  declare timeline: Timeline;

  @Field(() => Satisfier, { nullable: true })
  @OneToOne(() => Satisfier)
  @JoinColumn()
  declare satisfier: Satisfier;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'simple-enum',
    enum: models.ToyAssignment,
  })
  declare toyAssignment: models.ToyAssignment;
}
