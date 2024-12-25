import { ArgsType, InputType, Int } from '@nestjs/graphql';
import * as models from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';

@InputType()
@ArgsType()
export class RatingDto extends models.Rating {
  @DtoField()
  declare score: number;

  @DtoField(() => Int)
  declare orgasms: number;

  @DtoField()
  declare message: string;

  @DtoField(() => Int)
  declare runId: number;
}
