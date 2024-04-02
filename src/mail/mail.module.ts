import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  // imports: [
  //   MailerModule.forRoot({
  //     transport: {
  //       host: 'smtp.example.com',
  //       secure: false,
  //       auth: {
  //         user: 'user@example.com',
  //         pass: 'topsecret',
  //       },
  //     },
  //     defaults: {
  //       from: '"No Reply" <noreply@example.com>',
  //     },
  //     template: {
  //       dir: join(__dirname, 'templates'),
  //       adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
  //       options: {
  //         strict: true,
  //       },
  //     },
  //   }),
  // ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
