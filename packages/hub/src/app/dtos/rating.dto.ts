import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import * as models from '@xx/models';

@InputType()
@ArgsType()
export class RatingDto extends models.Rating {
  @Field()
  score: number;

  @Field(() => Int)
  orgasms: number;

  @Field()
  message: string;

  @Field(() => Int)
  runId: number;
}
