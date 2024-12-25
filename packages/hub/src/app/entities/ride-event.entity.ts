import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@puschel/models';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { jsonFieldMiddleware } from '../middleware/json-field.middleware';
import { Run } from './run.entity';

@ObjectType()
@Entity()
export class RideEvent extends models.RideEvent {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  declare id: number;

  @Field({ nullable: true })
  @Column()
  declare date: Date;

  @Field(() => Object, { middleware: [jsonFieldMiddleware], nullable: true })
  @Column({
    type: 'text',
    nullable: true,
  })
  declare payload?: any;

  @Field(() => Run, { nullable: true })
  @ManyToOne(() => Run, (run) => run.events)
  declare run: Run;
}
