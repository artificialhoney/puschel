import { ArgsType, InputType, Int } from '@nestjs/graphql';
import * as models from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';
import { Timeline } from '../entities/timeline.entity';
import { TimelineDto } from './timeline.dto';

@InputType()
@ArgsType()
export class PlayDto extends models.Play {
  @DtoField(() => Int, { nullable: true })
  id: number;

  @DtoField()
  name: string;

  @DtoField()
  description: string;

  @DtoField(() => [TimelineDto])
  timelines: Timeline[];
}
