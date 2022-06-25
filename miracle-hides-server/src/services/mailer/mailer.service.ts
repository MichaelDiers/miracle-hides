import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ConfigService } from '../config/config.service';
@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {

  }
  async sendMailAsync(email: string, code: string): Promise<void> {
    const { mail: mailConfig } = await this.configService.readAsync();
    const transporter = createTransport(
      {
        auth: {
          user: mailConfig.user,
          pass: mailConfig.password,
        },
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.secure,
      },
      {
        from: mailConfig.user,
        subject: 'Miracle Hides Invitation',
      });

      await transporter.sendMail({
        to: email,
        text: `http://localhost:3000/plain/index.html?email=${email}&verificationCode=${code}`,
        html: `http://localhost:3000/plain/index.html?email=${email}&verificationCode=${code}`,
      });
  }
}
