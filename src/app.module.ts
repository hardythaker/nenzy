import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModule } from './job/job.module';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { JobTitleModule } from './job-title/job-title.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { DepartmentModule } from './department/department.module';
import { CompanyModule } from './company/company.module';
import { RoleModule } from './role/role.module';
import { CompanyUserRoleModule } from './company-user-role/company-user-role.module';
import { PlanModule } from './plan/plan.module';

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
    JobTitleModule,
    UserModule,
    AuthModule,
    DepartmentModule,
    CompanyModule,
    RoleModule,
    CompanyUserRoleModule,
    PlanModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
