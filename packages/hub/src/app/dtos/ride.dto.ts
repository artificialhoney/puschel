import { ArgsType, InputType, Int } from '@nestjs/graphql';
import { ToyAssignment } from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';
import { Ride } from '../entities/ride.entity';
import { Satisfier } from '../entities/satisfier.entity';
import { SatisfierDto } from './satisfier.dto';

@InputType()
@ArgsType()
export class RideDto extends Ride {
  @DtoField(() => Int, { nullable: true })
  id: number;

  @DtoField(() => Boolean)
  enabled: boolean;

  @DtoField(() => String)
  toyAssignment: ToyAssignment;

  @DtoField(() => Int)
  index: number;

  @DtoField(() => Int)
  length: number;

  @DtoField(() => SatisfierDto)
  satisfier: Satisfier;

  @DtoField(() => Int, { nullable: true })
  timelineId: number;
}
