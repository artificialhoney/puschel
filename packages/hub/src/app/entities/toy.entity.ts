import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@puschel/models';
import { ToyType } from '@puschel/models';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Timeline } from './timeline.entity';

@ObjectType()
@Entity()
export class Toy extends models.Toy {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  declare id: number;

  @Field({ nullable: true })
  @Column()
  declare name: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'simple-enum',
    enum: ToyType,
  })
  declare type: ToyType;

  @Field({ nullable: true })
  @Column({ unique: true })
  declare uuid: string;

  @Field(() => [Timeline], { nullable: true })
  @OneToMany(() => Timeline, (timeline) => timeline.toy)
  declare timelines: Timeline[];
}
