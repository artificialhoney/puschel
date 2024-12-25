import noble, { Peripheral } from '@abandonware/noble';
import { EventEmitter } from 'events';

import { logger } from '../utils/logger';

export abstract class BleService extends EventEmitter {
  protected readonly logger = logger;
  private _scanning = false;

  public get scanning() {
    return this._scanning;
  }

  public async scan(...serviceUUIDs: string[]) {
    if (this.scanning) {
      await this.stop();
    }

    noble.on('stateChange', (state) => {
      this.logger.info(
        '%s - Bluetooth state changed [%s]',
        this.constructor['name'],
        state
      );
      if (state === 'poweredOn') {
        this.logger.info(
          '%s - Start scanning bluetooth devices',
          this.constructor['name']
        );
        noble.startScanningAsync(serviceUUIDs, true);
        this._scanning = true;
        noble.on('discover', async (peripheral: Peripheral) => {
          this.onDiscover(peripheral);
        });
      } else {
        this.stop();
      }
    });
  }

  public async stop() {
    this.logger.info(
      '%s - Stop scanning bluetooth devices',
      this.constructor['name']
    );
    await noble.stopScanningAsync();
    noble.removeListener('discover', this.onDiscover);
    this._scanning = false;
  }

  protected abstract onDiscover(peripheral: Peripheral): void;
}
