import { ArgsType, InputType, Int } from '@nestjs/graphql';
import * as models from '@puschel/models';
import { UserGender } from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';

@InputType()
@ArgsType()
export class UserDto extends models.User {
  @DtoField(() => Int, { nullable: true })
  declare id: number;

  @DtoField()
  declare username: string;

  @DtoField()
  declare description: string;

  @DtoField()
  declare password: string;

  @DtoField()
  declare avatar: string;

  @DtoField(() => String)
  declare gender: UserGender;
}
