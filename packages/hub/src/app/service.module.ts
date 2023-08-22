import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiService } from '@xx/ai';
import { SmartWatchService, ToyService as BleToyService } from '@xx/core';

import { Play } from './entities/play.entity';
import { Rating } from './entities/rating.entity';
import { Ride } from './entities/ride.entity';
import { RideEvent } from './entities/ride-event.entity';
import { Run } from './entities/run.entity';
import { Satisfier } from './entities/satisfier.entity';
import { Timeline } from './entities/timeline.entity';
import { Toy } from './entities/toy.entity';
import { User } from './entities/user.entity';
import { PlayService } from './services/play.service';
import { PlayTaskService } from './services/play-task.service';
import { RatingService } from './services/rating.service';
import { RideService } from './services/ride.service';
import { RideEventService } from './services/ride-event.service';
import { RunService } from './services/run.service';
import { SatisfierService } from './services/satisfier.service';
import { TimelineService } from './services/timeline.service';
import { ToyService } from './services/toy.service';
import { UpdateService } from './services/update.service';
import { UserService } from './services/user.service';
import { WifiService } from './services/wifi.service';

const entities = [
  Toy,
  RideEvent,
  Satisfier,
  Rating,
  Timeline,
  Run,
  Ride,
  Play,
  User,
];

const services = [
  ToyService,
  RideEventService,
  SatisfierService,
  RatingService,
  TimelineService,
  RideService,
  RunService,
  PlayService,
  UserService,
  PlayTaskService,
  WifiService,
  UpdateService,
];

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  providers: [
    ...services,
    {
      provide: BleToyService,
      useFactory: async () => {
        const service = new BleToyService();
        service.scan();
        return service;
      },
    },
    {
      provide: SmartWatchService,
      useFactory: async () => {
        const service = new SmartWatchService();
        service.scan();
        return service;
      },
    },
    {
      provide: AiService,
      useClass: AiService,
    },
  ],
  exports: [...services],
})
export class ServiceModule {}
