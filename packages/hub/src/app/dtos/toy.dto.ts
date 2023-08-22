import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import * as models from '@xx/models';

@InputType()
@ArgsType()
export class ToyDto extends models.Toy {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  name: string;
}
