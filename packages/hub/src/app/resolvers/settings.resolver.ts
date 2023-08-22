import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { ConfigService } from 'nestjs-config';

import { camelToSnakeCase } from '../app.constants';
import { SettingsDto } from '../dtos/settings.dto';
import { Settings } from '../entities/settings.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserActionGuard } from '../guards/user-action.guard';
import { WifiService } from '../services/wifi.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Settings)
export class SettingsResolver {
  private static ENV_NAME = '.env';

  constructor(
    private configService: ConfigService,
    private wifiService: WifiService
  ) {}

  @Mutation(() => Settings)
  @UseGuards(new UserActionGuard())
  updateSettings(
    @Args('settings', { type: () => SettingsDto }) settings: Settings
  ) {
    this.configService.set('settings', settings);
    this.configService.set(
      'settings.adminPassword',
      crypto.createHash('md5').update(settings.adminPassword).digest('hex')
    );

    const s = this.configService.get('settings');
    fs.writeFileSync(
      SettingsResolver.ENV_NAME,
      Object.keys(s).reduce((agg, val) => {
        return `
${camelToSnakeCase(val).toUpperCase()}=${s[val]}${agg}
`;
      }, '')
    );

    this.wifiService.init();

    return new Settings();
  }

  @Query(() => Settings)
  @UseGuards(new UserActionGuard())
  findSettings() {
    return Object.assign(new Settings(), this.configService.get('settings'));
  }
}
