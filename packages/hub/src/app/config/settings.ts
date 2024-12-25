import { Settings } from '@puschel/models';
import * as crypto from 'crypto';

export default (() => {
  const settings = new Settings();
  (settings.mongoUrl = 'mongodb://puschel:unsecure@localhost:27017'),
    (settings.port = parseInt(process.env.PORT) || 3000);
  settings.staticPath = process.env.STATIC_PATH;
  settings.port = parseInt(process.env.PORT) || 3000;
  settings.adminPassword =
    process.env.ADMIN_PASSWORD ||
    crypto.createHash('md5').update('puschel').digest('hex');
  settings.jwtSecret =
    process.env.JWT_SECRET ||
    crypto.createHash('md5').update('puschel').digest('hex');

  return settings;
})();
