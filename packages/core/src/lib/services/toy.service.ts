import { Peripheral } from '@abandonware/noble';
import { ToyType } from '@xx/models';

import { FantasyCupToy } from '../toys/fantasy-cup.toy';
import { JeffersonToy } from '../toys/jefferson.toy';
import { LovenseLushToy } from '../toys/lovense-lush.toy';
import { PulseUnionToy } from '../toys/pulse-union.toy';
import { Toy } from '../toys/toy';
import { BleService } from './ble.service';

export class ToyService extends BleService {
  static EVENT_NAME = 'toy';
  public readonly toys: Map<string, Toy | null> = new Map<string, Toy | null>();

  protected async onDiscover(peripheral: Peripheral) {
    const name = peripheral.advertisement.localName?.trim();
    if (!name) {
      return;
    }
    if (name.match(LovenseLushToy.NAME_REGEX)) {
      this.handleToy(name, peripheral, ToyType.LOVENSE_LUSH);
    } else if (name.match(FantasyCupToy.NAME_REGEX)) {
      this.handleToy(name, peripheral, ToyType.FANTASY_CUP);
    } else if (name.match(PulseUnionToy.NAME_REGEX)) {
      this.handleToy(name, peripheral, ToyType.PULSE_UNION);
    } else if (name.match(JeffersonToy.NAME_REGEX)) {
      this.handleToy(name, peripheral, ToyType.JEFFERSON);
    }
  }

  private handleToy(name: string, peripheral: Peripheral, toyType: ToyType) {
    if (this.toys.has(peripheral.uuid)) {
      const toy = this.toys.get(peripheral.uuid);
      if (toy === null) {
        return;
      }
      this.emit(ToyService.EVENT_NAME, toy);
    } else {
      this.logger.info(
        '%s - Bluetooth device discovered [%s] [%s]',
        ToyService.name,
        name,
        peripheral.uuid
      );
      this.toys.set(peripheral.uuid, null);
      let t;
      switch (toyType) {
        case ToyType.LOVENSE_LUSH:
          t = new LovenseLushToy(peripheral);
          break;
        case ToyType.FANTASY_CUP:
          t = new FantasyCupToy(peripheral);
          break;
        case ToyType.PULSE_UNION:
          t = new PulseUnionToy(peripheral);
          break;
        case ToyType.JEFFERSON:
          t = new JeffersonToy(peripheral);
          break;
      }
      this.toys.set(peripheral.uuid, t);
      this.emit(ToyService.EVENT_NAME, t);
    }
  }
}
