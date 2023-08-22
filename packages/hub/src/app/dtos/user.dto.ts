import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import * as models from '@xx/models';
import { UserGender } from '@xx/models';

@InputType()
@ArgsType()
export class UserDto extends models.User {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  username: string;

  @Field()
  description: string;

  @Field()
  password: string;

  @Field()
  avatar: string;

  @Field(() => String)
  gender: UserGender;
}
