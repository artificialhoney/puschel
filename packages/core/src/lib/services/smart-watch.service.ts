import { Peripheral } from '@abandonware/noble';

import { BleService } from './ble.service';

export interface SmartWatchEvent {
  uuid: string;
  payload: {
    hrm: {
      confidence: number;
      bpm: number;
    };
    bar: {
      temperature: number;
      pressure: number;
      altitude: number;
    };
    acc: {
      x: number;
      y: number;
      z: number;
    };
  };
}

export class SmartWatchService extends BleService {
  static EVENT_NAME = 'smartWatch';
  static XX_SERVICE_NAME = 'XX';
  static XX_SERVICE_ID = '1801';

  public readonly smartWatches: Map<string, Peripheral> = new Map<
    string,
    Peripheral
  >();

  protected onDiscover(peripheral: Peripheral) {
    const name = peripheral.advertisement.localName?.trim();
    if (SmartWatchService.XX_SERVICE_NAME !== name) {
      return;
    }
    if (!this.smartWatches.has(peripheral.uuid)) {
      this.logger.info(
        '%s - Bluetooth device discovered [%s] [%s]',
        SmartWatchService.name,
        name,
        peripheral.uuid
      );
      this.smartWatches.set(peripheral.uuid, peripheral);
    }
    const data = peripheral.advertisement.serviceData?.find(
      (d) => d.uuid === SmartWatchService.XX_SERVICE_ID
    )?.data;

    if (!data) {
      return;
    }

    this.emit(
      SmartWatchService.EVENT_NAME,
      this.parseData(peripheral.uuid, data)
    );
  }

  private parseData(uuid: string, data: Buffer): SmartWatchEvent {
    return {
      uuid,
      payload: {
        hrm: {
          confidence: data.readInt8(),
          bpm: data.readInt8(1),
        },
        bar: {
          temperature: data.readInt16LE(2) / 100,
          pressure: data.readUInt32LE(4) / 1000,
          altitude: data.readInt32LE(8) / 100,
        },
        acc: {
          x: data.readInt16LE(12) / 100,
          y: data.readInt16LE(14) / 100,
          z: data.readInt16LE(16) / 100,
        },
      },
    };
  }
}
