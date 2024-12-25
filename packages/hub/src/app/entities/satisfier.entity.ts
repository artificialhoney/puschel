import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@puschel/models';
import { SatisfierType } from '@puschel/models';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { jsonFieldMiddleware } from '../middleware/json-field.middleware';
import { Ride } from './ride.entity';

@ObjectType()
export class SmartWatch {
  @Field(() => String, { nullable: true })
  uuid: string;
  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
@Entity()
export class Satisfier extends models.Satisfier {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  declare id: number;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'simple-enum',
    enum: SatisfierType,
  })
  declare type: SatisfierType;

  @Field(() => Object, { middleware: [jsonFieldMiddleware], nullable: true })
  @Column({ type: 'text', nullable: true })
  declare settings?: any;

  @Field(() => Ride, { nullable: true })
  @OneToOne(() => Ride)
  declare ride: Ride;
}
