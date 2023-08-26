import { Settings } from '@puschel/models';
import * as crypto from 'crypto';

export default (() => {
  const settings = new Settings();
  settings.port = parseInt(process.env.PORT) || 3000;
  settings.staticPath = process.env.STATIC_PATH;
  settings.port = parseInt(process.env.PORT) || 3000;
  settings.wifiSsid = process.env.WIFI_SSID;
  settings.wifiPassword = process.env.WIFI_PASSWORD;
  settings.adminPassword =
    process.env.ADMIN_PASSWORD ||
    crypto.createHash('md5').update('puschelx').digest('hex');
  settings.jwtSecret =
    process.env.JWT_SECRET ||
    crypto.createHash('md5').update('puschel').digest('hex');
  return settings;
})();
