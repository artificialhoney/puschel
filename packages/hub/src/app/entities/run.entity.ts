import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@puschel/models';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Play } from './play.entity';
import { Rating } from './rating.entity';
import { RideEvent } from './ride-event.entity';

@ObjectType()
@Entity()
export class Run extends models.Run {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  paused: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  active: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 0 })
  runTime: number;

  @Field(() => Play, { nullable: true })
  @ManyToOne(() => Play, (play) => play.runs)
  play: Play;

  @OneToMany(() => RideEvent, (event) => event.run)
  events: RideEvent[];

  @Field(() => [Rating], { nullable: true })
  @OneToMany(() => Rating, (rating) => rating.run)
  ratings: Rating[];
}
