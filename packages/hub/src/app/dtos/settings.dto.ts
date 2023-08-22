import { ArgsType, Field, InputType } from '@nestjs/graphql';
import * as models from '@xx/models';

@InputType()
@ArgsType()
export class SettingsDto extends models.Settings {
  @Field()
  adminPassword: string;

  @Field()
  wifiSsid: string;

  @Field()
  wifiPassword: string;
}
