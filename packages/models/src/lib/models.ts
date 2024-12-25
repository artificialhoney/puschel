import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotEquals,
  ValidateNested,
} from 'class-validator';

export enum UserGender {
  FEMALE = 'xx',
  MALE = 'xy',
}

export enum ToyType {
  LOVENSE_LUSH = 'lovenseLush',
  FANTASY_CUP = 'fantasyCup',
  PULSE_UNION = 'pulseUnion',
  JEFFERSON = 'jefferson',
}

export enum ToyAssignment {
  VIBRATE = 'vibrate',
  WARM = 'warm',
  PUSH = 'push',
  ELECTRIFY = 'electrify',
  PATTERN = 'pattern',
}

export const ToyCapabilities = {
  [ToyType.LOVENSE_LUSH]: [ToyAssignment.VIBRATE],
  [ToyType.FANTASY_CUP]: [
    ToyAssignment.VIBRATE,
    // ToyAssignment.PUSH,
    ToyAssignment.WARM,
    ToyAssignment.PATTERN,
  ],
  [ToyType.PULSE_UNION]: [ToyAssignment.VIBRATE, ToyAssignment.PATTERN],
  [ToyType.JEFFERSON]: [
    ToyAssignment.VIBRATE,
    ToyAssignment.PATTERN,
    ToyAssignment.ELECTRIFY,
  ],
};

export class User {
  id: number;
  @MinLength(6, { message: 'validation.user.username.minLength' })
  @MaxLength(20, { message: 'validation.user.username.maxLength' })
  @NotEquals('admin', { message: 'validation.user.username.notEquals' })
  @Matches('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$', '', {
    message: 'validation.user.username.matches',
  })
  username: string;
  @MinLength(6, { message: 'validation.user.password.minLength' })
  @MaxLength(20, { message: 'validation.user.password.maxLength' })
  @Matches(
    '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]+$',
    '',
    {
      message: 'validation.user.password.matches',
    },
  )
  password: string;
  @IsNotEmpty({ message: 'validation.user.description.isNotEmpty' })
  description: string;
  @IsNotEmpty({ message: 'validation.user.avatar.isNotEmpty' })
  avatar: string;
  @IsEnum(UserGender, { message: 'validation.user.gender.isEnum' })
  gender: UserGender;
}

export enum SatisfierType {
  RANDOM = 'random',
  PEAK = 'peak',
  MANUAL = 'manual',
  REPLAY = 'replay',
  SMART_WATCH = 'smartWatch',
  AI = 'ai',
}

export class Satisfier {
  id: number;
  @IsEnum(SatisfierType, { message: 'validation.satisfier.type.isEnum' })
  type: SatisfierType;
  ride: Ride;
  @ValidateNested()
  settings?: any;
}

export class Timeline {
  id: number;
  play: Play;
  toy: Toy;
  @Min(1, { message: 'validation.timeline.toy.isNotEmpty' })
  toyId: number;
  @ValidateNested()
  @IsArray({ message: 'validation.timeline.rides.isArray' })
  @ArrayNotEmpty({ message: 'validation.timeline.rides.arrayNotEmpty' })
  rides: Ride[];
}

export class Ride {
  id: number;
  timeline: Timeline;
  timelineId: number;
  @IsEnum(ToyAssignment, {
    message: 'validation.ride.toyAssignment.isEnum',
  })
  toyAssignment: ToyAssignment;
  @ValidateNested()
  @IsNotEmpty({ message: 'validation.ride.satisfier.isNotEmpty' })
  satisfier: Satisfier;
  @Min(0, { message: 'validation.ride.index.min' })
  index: number;
  @Min(1, { message: 'validation.ride.length.min' })
  length: number;
  enabled: boolean;
}

export class Run {
  id: number;
  play: Play;
  playId: number;
  startDate: Date;
  runTime: number;
  active: boolean;
  paused: boolean;
  events: RideEvent[];
  ratings: Rating[];
}

export class Play {
  id: number;
  @IsNotEmpty({ message: 'validation.play.name.isNotEmpty' })
  @Matches('^[\\d\\w ]+$', 'i', {
    message: 'validation.play.name.matches',
  })
  name: string;
  @IsNotEmpty({ message: 'validation.play.description.isNotEmpty' })
  description: string;
  @ValidateNested()
  @IsArray({ message: 'validation.play.timelines.isArray' })
  @ArrayNotEmpty({ message: 'validation.play.timelines.arrayNotEmpty' })
  timelines: Timeline[];
  runs: Run[];
}

export class Toy {
  id: number;
  @IsNotEmpty({ message: 'validation.toy.name.isNotEmpty' })
  @Matches('^[\\d\\w ]+$', 'i', {
    message: 'validation.toy.name.matches',
  })
  name: string;
  type: ToyType;
  uuid: string;
}

export class RideEvent {
  id: number;
  date: Date;
  run: Run;
  payload?: any;
}

export class Rating {
  id: number;
  date: Date;
  user: User;
  userId: number;
  @Min(0, { message: 'validation.rating.score.min' })
  @Max(1, { message: 'validation.rating.score.max' })
  score: number;
  @Min(0, { message: 'validation.rating.orgasms.min' })
  @Max(10, { message: 'validation.rating.orgasms.max' })
  orgasms: number;
  @IsNotEmpty({ message: 'validation.rating.message.isNotEmpty' })
  message: string;
  run: Run;
  runId: number;
}

export class Settings {
  port?: number;
  @MinLength(6, { message: 'validation.settings.adminPassword.minLength' })
  @MaxLength(20, { message: 'validation.settings.adminPassword.maxLength' })
  @Matches(
    '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]+$',
    '',
    {
      message: 'validation.settings.adminPassword.matches',
    },
  )
  adminPassword: string;
  jwtSecret?: string;
  staticPath?: string;
  mongoUrl?: string;
}
