import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModule } from './job/job.module';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { JobTitleModule } from './job-title/job-title.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URI: Joi.string().required(), //DATABASE_URI env variable is required to start the APP.
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URI'), // Loaded from .ENV
        dbName: config.get<string>('DATABASE_NAME'), // Loaded from .ENV
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    JobModule,
    JobTitleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
