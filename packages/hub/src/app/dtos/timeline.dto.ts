import { Field, InputType, Int } from '@nestjs/graphql';
import { Timeline } from '@xx/models';

import { Ride } from '../entities/ride.entity';
import { RideDto } from './ride.dto';
@InputType()
export class TimelineDto extends Timeline {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Int)
  toyId: number;

  @Field(() => [RideDto])
  rides: Ride[];
}
