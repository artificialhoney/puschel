import { ArrayNotEmpty, IsArray, IsNotEmpty, Max, Min } from 'class-validator';

export class RandomSatisfier {
  @Min(5000, { message: 'validation.satisfier.types.random.interval.min' })
  @Max(60000, { message: 'validation.satisfier.types.random.interval.max' })
  interval: number;
}

export class PeakSatisfier {
  readonly interval = 5000;
  @IsNotEmpty({ message: 'validation.satisfier.types.peak.easing.isNotEmpty' })
  easing: string;
  @Min(0, { message: 'validation.satisfier.types.peak.start.min' })
  @Max(10, { message: 'validation.satisfier.types.peak.start.max' })
  start: number;
  @Min(0, { message: 'validation.satisfier.types.peak.start.min' })
  @Max(10, { message: 'validation.satisfier.types.peak.start.max' })
  end: number;
}

export class ReplaySatisfier {
  @IsNotEmpty({
    message: 'validation.satisfier.types.replay.playId.isNotEmpty',
  })
  playId: string;
  @IsNotEmpty({ message: 'validation.satisfier.types.replay.runId.isNotEmpty' })
  runId: string;
  @IsNotEmpty({
    message: 'validation.satisfier.types.replay.timelineId.isNotEmpty',
  })
  timelineId: string;
}

export class SmartWatchSatisfier {
  @IsNotEmpty({
    message: 'validation.satisfier.types.smartWatch.uuid.isNotEmpty',
  })
  uuid: string;
}

export class AiSatisfier {
  readonly interval = 5000;
  @IsArray({ message: 'validation.satisfier.types.ai.playIds.isArray' })
  @ArrayNotEmpty({
    message: 'validation.satisfier.types.ai.playIds.arrayNotEmpty',
  })
  playIds: number[];
}
