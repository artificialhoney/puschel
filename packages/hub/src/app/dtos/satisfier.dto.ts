import { InputType, Int } from '@nestjs/graphql';
import * as models from '@puschel/models';
import { SatisfierType } from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';

@InputType()
export class SatisfierDto extends models.Satisfier {
  @DtoField(() => Int, { nullable: true })
  id: number;

  @DtoField(() => String)
  type: SatisfierType;

  @DtoField(() => Object, { nullable: true })
  settings?: any;
}
