import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@puschel/models';
import { UserGender } from '@puschel/models';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Rating } from './rating.entity';

@ObjectType()
@Entity()
export class User extends models.User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  declare id: number;

  @Field({ nullable: true })
  @Column({ unique: true })
  declare username: string;

  @Column()
  declare password: string;

  @Field({ nullable: true })
  @Column('text')
  declare description: string;

  @Field({ nullable: true })
  @Column('text')
  declare avatar: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'simple-enum',
    enum: UserGender,
  })
  declare gender: UserGender;

  @Field(() => [Rating], { nullable: true })
  @OneToMany(() => Rating, (rating) => rating.user)
  declare ratings: Rating[];
}
