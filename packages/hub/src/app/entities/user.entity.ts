import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as models from '@xx/models';
import { UserGender } from '@xx/models';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Rating } from './rating.entity';

@ObjectType()
@Entity()
export class User extends models.User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column('text')
  description: string;

  @Field({ nullable: true })
  @Column('text')
  avatar: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'simple-enum',
    enum: UserGender,
  })
  gender: UserGender;

  @Field(() => [Rating], { nullable: true })
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}
