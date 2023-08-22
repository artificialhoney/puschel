import { Peripheral } from '@abandonware/noble';
import { ToyAssignment, ToyType } from '@xx/models';

import { Toy } from './toy';

export class LovenseLushToy extends Toy {
  static override NAME_REGEX = 'LVS-Lush.+';
  static override CHARACTERISTIC_ID = 1;
  static override ASSIGNMENT_DIMENSIONS = new Map<ToyAssignment, number>([
    [ToyAssignment.VIBRATE, 5],
  ]);
  constructor(public override peripheral: Peripheral) {
    super(ToyType.LOVENSE_LUSH, peripheral);
  }

  public override async disconnect() {
    await this.characteristic?.writeAsync(
      Buffer.from(`Vibrate:0;`, 'utf-8'),
      false
    );

    await this.peripheral.disconnect();
  }

  public override async writeValue(
    value: number,
    assignment: ToyAssignment
  ): Promise<void> {
    switch (assignment) {
      case ToyAssignment.VIBRATE:
        await this.characteristic.writeAsync(
          Buffer.from(`Vibrate:${value};`, 'utf-8'),
          false
        );
        break;
    }
  }
}
