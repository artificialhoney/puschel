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
  id: number;

  @Field({ nullable: true })
  @Column({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Column()
  description: string;

  @Field(() => [Timeline], { nullable: true })
  @OneToMany(() => Timeline, (timeline) => timeline.play)
  timelines: Timeline[];

  @Field(() => [Run], { nullable: true })
  @OneToMany(() => Run, (run) => run.play)
  runs: Run[];
}
