import { Field, ObjectType } from '@nestjs/graphql';
import * as models from '@xx/models';

@ObjectType()
export class Settings extends models.Settings {
  @Field({ nullable: true })
  wifiSsid: string;
}
