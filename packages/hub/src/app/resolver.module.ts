import { Module } from '@nestjs/common';

import { PlayResolver } from './resolvers/play.resolver';
import { RatingResolver } from './resolvers/rating.resolver';
import { RideResolver } from './resolvers/ride.resolver';
import { RideEventResolver } from './resolvers/ride-event.resolver';
import { RunResolver } from './resolvers/run.resolver';
import { SatisfierResolver } from './resolvers/satisfier.resolver';
import { SettingsResolver } from './resolvers/settings.resolver';
import { ToyResolver } from './resolvers/toy.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { ServiceModule } from './service.module';

const resolvers = [
  ToyResolver,
  RideEventResolver,
  SatisfierResolver,
  RatingResolver,
  RunResolver,
  RideResolver,
  PlayResolver,
  UserResolver,
  SettingsResolver,
];

@Module({
  imports: [ServiceModule],
  providers: [...resolvers],
  exports: [...resolvers],
})
export class ResolverModule {}
