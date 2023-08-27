import { ArgsType, InputType } from '@nestjs/graphql';
import * as models from '@puschel/models';

import { DtoField } from '../decorators/dto-field.decorator';

@InputType()
@ArgsType()
export class SettingsDto extends models.Settings {
  @DtoField()
  adminPassword: string;

  @DtoField()
  wifiSsid: string;

  @DtoField()
  wifiPassword: string;
}
