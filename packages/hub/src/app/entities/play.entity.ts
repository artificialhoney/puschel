import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@puschel/models';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Run } from './run.entity';
import { Timeline } from './timeline.entity';

@ObjectType()
@Entity()
export class Play extends models.Play {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  declare id: number;

  @Field({ nullable: true })
  @Column({ unique: true })
  declare name: string;

  @Field({ nullable: true })
  @Column()
  declare description: string;

  @Field(() => [Timeline], { nullable: true })
  @OneToMany(() => Timeline, (timeline) => timeline.play)
  declare timelines: Timeline[];

  @Field(() => [Run], { nullable: true })
  @OneToMany(() => Run, (run) => run.play)
  declare runs: Run[];
}
