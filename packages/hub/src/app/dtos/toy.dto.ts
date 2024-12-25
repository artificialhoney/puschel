import { ArgsType, InputType, Int } from '@nestjs/graphql';
import * as models from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';

@InputType()
@ArgsType()
export class ToyDto extends models.Toy {
  @DtoField(() => Int, { nullable: true })
  declare id: number;

  @DtoField()
  declare name: string;
}
