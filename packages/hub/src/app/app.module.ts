import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { pinoOptions } from '@xx/core';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { LoggerModule } from 'nestjs-pino';
import path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { JsonScalar } from './json.scalar';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthPlugin } from './plugins/jwt-auth.plugin';
import { ResolverModule } from './resolver.module';
import { ServiceModule } from './service.module';

const modules = [
  LoggerModule.forRoot({
    pinoHttp: pinoOptions('HUB'),
    exclude: [{ method: RequestMethod.ALL, path: '/graphql' }],
  }),
  ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
  DatabaseModule,
  ServiceModule,
  ResolverModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get('settings.jwtSecret'),
        signOptions: { expiresIn: '7d' },
      };
    },
    inject: [ConfigService],
  }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    playground: process.env.NODE_ENV !== 'production',
    driver: ApolloDriver,
    autoSchemaFile: path.join(process.cwd(), 'schema.gql'),
  }),
  ScheduleModule.forRoot(),
  ServeStaticModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService) => {
      const staticPath = configService.get('settings.staticPath');
      return staticPath
        ? [
            {
              rootPath: staticPath,
            },
          ]
        : [];
    },
    inject: [ConfigService],
  }),
];

@Module({
  imports: [...modules],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JsonScalar, JwtAuthPlugin],
})
export class AppModule {}
