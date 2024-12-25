import { ArgsType, InputType } from '@nestjs/graphql';
import * as models from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';

@InputType()
@ArgsType()
export class SettingsDto extends models.Settings {
  @DtoField()
  declare adminPassword: string;

  @DtoField()
  declare wifiSsid: string;

  @DtoField()
  declare wifiPassword: string;
}
