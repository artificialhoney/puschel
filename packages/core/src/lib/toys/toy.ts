import { Characteristic, Peripheral } from '@abandonware/noble';
import { RideEvent, ToyAssignment, ToyType } from '@xx/models';

export abstract class Toy {
  static NAME_REGEX = '';
  static CHARACTERISTIC_ID = -1;
  static ASSIGNMENT_DIMENSIONS: Map<ToyAssignment, number>;
  public characteristic: Characteristic;
  public assignedValues = new Map<ToyAssignment, number>();
  constructor(
    public readonly type: ToyType,
    public readonly peripheral: Peripheral
  ) {}

  public abstract disconnect(): Promise<void>;

  public async write(
    event: RideEvent,
    assignment: ToyAssignment
  ): Promise<void> {
    if (
      this.peripheral.state !== 'connected' &&
      this.peripheral.state !== 'connecting'
    ) {
      await this.peripheral.connectAsync();
      const result =
        await this.peripheral.discoverAllServicesAndCharacteristicsAsync();
      this.characteristic =
        result.characteristics[(this as any).constructor.CHARACTERISTIC_ID];
    }

    const payload =
      typeof event.payload === 'string'
        ? JSON.parse(event.payload)
        : event.payload;

    const value = Math.round(
      payload.value *
        (this as any).constructor.ASSIGNMENT_DIMENSIONS.get(assignment)
    );

    this.assignedValues.set(assignment, value);

    await this.writeValue(value, assignment);
  }

  public abstract writeValue(
    value: number,
    assignment: ToyAssignment
  ): Promise<void>;
}
