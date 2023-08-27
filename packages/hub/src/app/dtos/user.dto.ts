import { ArgsType, InputType, Int } from '@nestjs/graphql';
import * as models from '@puschel/models';
import { UserGender } from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';

@InputType()
@ArgsType()
export class UserDto extends models.User {
  @DtoField(() => Int, { nullable: true })
  id: number;

  @DtoField()
  username: string;

  @DtoField()
  description: string;

  @DtoField()
  password: string;

  @DtoField()
  avatar: string;

  @DtoField(() => String)
  gender: UserGender;
}
