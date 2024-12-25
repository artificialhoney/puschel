import { ArgsType, InputType } from '@nestjs/graphql';
import * as models from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';

@InputType()
@ArgsType()
export class RideEventDto extends models.RideEvent {
  @DtoField(() => Object, { nullable: true })
  declare payload?: any;
}
