import { Peripheral } from '@abandonware/noble';
import { ToyAssignment, ToyType } from '@xx/models';

import { Toy } from './toy';

export class FantasyCupToy extends Toy {
  static override NAME_REGEX = 'FK008A';
  static override CHARACTERISTIC_ID = 0;
  static override ASSIGNMENT_DIMENSIONS = new Map<ToyAssignment, number>([
    [ToyAssignment.VIBRATE, 10],
    [ToyAssignment.WARM, 5],
    [ToyAssignment.PATTERN, 10],
  ]);
  constructor(public override peripheral: Peripheral) {
    super(ToyType.FANTASY_CUP, peripheral);
  }

  public override async disconnect() {
    await this.characteristic.writeAsync(
      Buffer.from([0x55, 0x03, 0x00, 0x00, 0x01, 0x00]),
      true
    );
    await this.peripheral.disconnect();
  }

  public override async writeValue(
    value: number,
    assignment: ToyAssignment
  ): Promise<void> {
    const patternValue = this.assignedValues.get(ToyAssignment.PATTERN);

    switch (assignment) {
      case ToyAssignment.VIBRATE:
        await this.characteristic.writeAsync(
          Buffer.from([
            0x55,
            0x03,
            0x00,
            0x00,
            patternValue ? value : 0x01,
            value,
          ]),
          true
        );
        break;
      case ToyAssignment.WARM:
        await this.characteristic.writeAsync(
          Buffer.from([0x55, 0x05, 0x01, value, 0x00, 0x00]),
          true
        );
        break;
      case ToyAssignment.PATTERN:
        await this.characteristic.writeAsync(
          Buffer.from([0x55, 0x03, 0x00, 0x03, value, 0x0a]),
          true
        );
        break;
    }
  }
}
