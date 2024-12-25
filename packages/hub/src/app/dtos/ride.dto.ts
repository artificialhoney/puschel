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
  declare id: number;

  @DtoField(() => Boolean)
  declare enabled: boolean;

  @DtoField(() => String)
  declare toyAssignment: ToyAssignment;

  @DtoField(() => Int)
  declare index: number;

  @DtoField(() => Int)
  declare length: number;

  @DtoField(() => SatisfierDto)
  declare satisfier: Satisfier;

  @DtoField(() => Int, { nullable: true })
  declare timelineId: number;
}
