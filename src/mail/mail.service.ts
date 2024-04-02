import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPasswordLink(user: User, url: string) {
    await this.mailerService.sendMail({
      to: user.username,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Nenzi.ai password reset link',
      template: './forgot-password', // `.hbs` extension is appended automatically
      context: {
        //filling curly brackets with content
        name: user.fullName,
        url,
      },
    });
  }
}
