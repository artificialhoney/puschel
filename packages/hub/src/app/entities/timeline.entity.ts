import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@xx/models';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Play } from './play.entity';
import { Ride } from './ride.entity';
import { Toy } from './toy.entity';

@ObjectType()
@Entity()
export class Timeline extends models.Timeline {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Play, { nullable: true })
  @ManyToOne(() => Play, (play) => play.timelines)
  play: Play;

  @Field(() => [Ride], { nullable: true })
  @OneToMany(() => Ride, (ride) => ride.timeline)
  rides: Ride[];

  @Field(() => Toy, { nullable: true })
  @ManyToOne(() => Toy, (toy) => toy.timelines)
  toy: Toy;

  @Field(() => Int, { nullable: true })
  toyId: number;
}
