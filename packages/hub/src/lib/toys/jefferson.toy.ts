import { Peripheral } from '@abandonware/noble';
import { ToyAssignment, ToyType } from '@puschel/models';

import { Toy } from './toy';

export class JeffersonToy extends Toy {
  static override NAME_REGEX = 'Aogu BLE';
  static override CHARACTERISTIC_ID = 7;
  static override ASSIGNMENT_DIMENSIONS = new Map<ToyAssignment, number>([
    [ToyAssignment.VIBRATE, 20],
    [ToyAssignment.PATTERN, 10],
  ]);
  constructor(public override peripheral: Peripheral) {
    super(ToyType.JEFFERSON, peripheral);
  }

  public override async disconnect() {
    await this.characteristic.writeAsync(Buffer.from([0x00, 0x00]), true);
    await this.peripheral.disconnect();
  }

  public override async writeValue(
    value: number,
    assignment: ToyAssignment
  ): Promise<void> {
    switch (assignment) {
      case ToyAssignment.VIBRATE:
        await this.characteristic.writeAsync(
          Buffer.from([0x00, value + 200]),
          false
        );
        break;
      case ToyAssignment.PATTERN:
        await this.characteristic.writeAsync(Buffer.from([0x00, value]), false);
        break;
    }
  }
}
