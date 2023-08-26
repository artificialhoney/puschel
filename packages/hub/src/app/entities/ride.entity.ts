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
  id: number;

  @Field(() => Boolean, { nullable: true })
  @Column()
  enabled: boolean;

  @Field(() => Int, { nullable: true })
  @Column()
  index: number;

  @Field(() => Int, { nullable: true })
  @Column()
  length: number;

  @Field(() => Timeline, { nullable: true })
  @ManyToOne(() => Timeline, (timeline) => timeline.rides)
  timeline: Timeline;

  @Field(() => Satisfier, { nullable: true })
  @OneToOne(() => Satisfier)
  @JoinColumn()
  satisfier: Satisfier;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'simple-enum',
    enum: models.ToyAssignment,
  })
  toyAssignment: models.ToyAssignment;
}
