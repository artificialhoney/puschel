import { InputType, Int } from '@nestjs/graphql';
import { Timeline } from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';
import { Ride } from '../entities/ride.entity';
import { RideDto } from './ride.dto';
@InputType()
export class TimelineDto extends Timeline {
  @DtoField(() => Int, { nullable: true })
  declare id: number;

  @DtoField(() => Int)
  declare toyId: number;

  @DtoField(() => [RideDto])
  declare rides: Ride[];
}
