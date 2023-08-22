import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@xx/models';
import { ToyType } from '@xx/models';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Timeline } from './timeline.entity';

@ObjectType()
@Entity()
export class Toy extends models.Toy {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'simple-enum',
    enum: ToyType,
  })
  type: ToyType;

  @Field({ nullable: true })
  @Column({ unique: true })
  uuid: string;

  @Field(() => [Timeline], { nullable: true })
  @OneToMany(() => Timeline, (timeline) => timeline.toy)
  timelines: Timeline[];
}
