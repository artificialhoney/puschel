import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import * as models from '@xx/models';

import { Timeline } from '../entities/timeline.entity';
import { TimelineDto } from './timeline.dto';

@InputType()
@ArgsType()
export class PlayDto extends models.Play {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [TimelineDto])
  timelines: Timeline[];
}
