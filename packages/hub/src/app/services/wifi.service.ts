import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as wifi from 'node-wifi';

@Injectable()
export class WifiService {
  private logger = new Logger(WifiService.name);
  constructor(private configService: ConfigService) {
    this.init();
  }

  public init() {
    const { wifiSsid, wifiPassword } = this.configService.get('settings');
    if (!wifiSsid || !wifiPassword) {
      return;
    }

    wifi.init({
      iface: 'wlan0',
    });

    wifi.connect({ ssid: wifiSsid, password: wifiPassword }, () => {
      this.logger.log(`Wifi connection established to [${wifiSsid}]`);
    });
  }
}
