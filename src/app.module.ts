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
import { CouponModule } from './coupon/coupon.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { JobInvitationModule } from './job-invitation/job-invitation.module';
import { MailModule } from './mail/mail.module';
import { validationSchema } from '../env/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/.env.${process.env.NODE_ENV}.local`,
      validationSchema,
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
    CouponModule,
    SubscriptionModule,
    JobApplicationModule,
    JobInvitationModule,
    MailModule,
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
