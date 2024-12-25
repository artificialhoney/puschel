import { Field, ObjectType } from '@nestjs/graphql';
import * as models from '@puschel/models';

@ObjectType()
export class Settings extends models.Settings {
  @Field({ nullable: true })
  declare wifiSsid: string;
}
