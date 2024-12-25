import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Play } from './entities/play.entity';
import { Rating } from './entities/rating.entity';
import { Ride } from './entities/ride.entity';
import { RideEvent } from './entities/ride-event.entity';
import { Run } from './entities/run.entity';
import { Satisfier } from './entities/satisfier.entity';
import { Timeline } from './entities/timeline.entity';
import { Toy } from './entities/toy.entity';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from 'nestjs-config';

const modules = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => {
      return {
        type: 'mongodb',
        url: config.get('settings.mongoUrl'),
        entities: [
          Toy,
          RideEvent,
          Satisfier,
          Rating,
          Timeline,
          Ride,
          Run,
          Play,
          User,
        ],
        synchronize: false,
      };
    },
    inject: [ConfigService],
  }),
];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class DatabaseModule {}
