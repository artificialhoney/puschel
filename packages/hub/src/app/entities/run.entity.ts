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
  declare id: number;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  declare paused: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  declare active: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  declare startDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 0 })
  declare runTime: number;

  @Field(() => Play, { nullable: true })
  @ManyToOne(() => Play, (play) => play.runs)
  declare play: Play;

  @OneToMany(() => RideEvent, (event) => event.run)
  declare events: RideEvent[];

  @Field(() => [Rating], { nullable: true })
  @OneToMany(() => Rating, (rating) => rating.run)
  declare ratings: Rating[];
}
