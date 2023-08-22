import { Field, InputType, Int } from '@nestjs/graphql';
import * as models from '@xx/models';
import { SatisfierType } from '@xx/models';

@InputType()
export class SatisfierDto extends models.Satisfier {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String)
  type: SatisfierType;

  @Field(() => Object, { nullable: true })
  settings?: any;
}
