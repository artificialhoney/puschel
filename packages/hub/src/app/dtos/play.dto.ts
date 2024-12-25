import { ArgsType, InputType, Int } from '@nestjs/graphql';
import * as models from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';
import { Timeline } from '../entities/timeline.entity';
import { TimelineDto } from './timeline.dto';

@InputType()
@ArgsType()
export class PlayDto extends models.Play {
  @DtoField(() => Int, { nullable: true })
  declare id: number;

  @DtoField()
  declare name: string;

  @DtoField()
  declare description: string;

  @DtoField(() => [TimelineDto])
  declare timelines: Timeline[];
}
