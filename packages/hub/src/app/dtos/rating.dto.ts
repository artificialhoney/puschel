import { ArgsType, InputType, Int } from '@nestjs/graphql';
import * as models from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';

@InputType()
@ArgsType()
export class RatingDto extends models.Rating {
  @DtoField()
  score: number;

  @DtoField(() => Int)
  orgasms: number;

  @DtoField()
  message: string;

  @DtoField(() => Int)
  runId: number;
}
