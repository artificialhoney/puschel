import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { ToyAssignment } from '@puschel/models';

import { Ride } from '../entities/ride.entity';
import { Satisfier } from '../entities/satisfier.entity';
import { SatisfierDto } from './satisfier.dto';

@InputType()
@ArgsType()
export class RideDto extends Ride {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => String)
  toyAssignment: ToyAssignment;

  @Field(() => Int)
  index: number;

  @Field(() => Int)
  length: number;

  @Field(() => SatisfierDto)
  satisfier: Satisfier;

  @Field(() => Int, { nullable: true })
  timelineId: number;
}
