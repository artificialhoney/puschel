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

const modules = [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: 'db.sqlite3',
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
    synchronize: true,
  }),
];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class DatabaseModule {}
