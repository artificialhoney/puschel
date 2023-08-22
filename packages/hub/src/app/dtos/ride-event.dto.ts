import { ArgsType, Field, InputType } from '@nestjs/graphql';
import * as models from '@xx/models';

@InputType()
@ArgsType()
export class RideEventDto extends models.RideEvent {
  @Field(() => Object, { nullable: true })
  payload?: any;
}
