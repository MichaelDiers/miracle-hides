import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import IMailerServiceConfig from 'src/types/services/mailer-service-config.interface';
import { IMailerService } from 'src/types/services/mailer-service.interface';

@Injectable()
export class MailerService implements IMailerService {
  constructor(private readonly config: IMailerServiceConfig) {
  }

  async sendAsync({
    displayName,
    frontEndUrl,
    language,
    to,
    verificationCode,
  } : {
    displayName: string,
    frontEndUrl: string,
    language: string,
    to: string,
    verificationCode: string,
  }): Promise<boolean> {
    if (process.env.MH_SUPPRESS_SEND_MAILS) {
      return true;
    }
    
    const transporter = createTransport(
      {
        host: this.config.host,
        port: this.config.port,
        secure: this.config.secure,
        auth: {
          user: this.config.auth.user,
          pass: this.config.auth.pass,
        },        
      },
      {
        from: this.config.from,
        subject: this.subject(language),
      },
    );

    try {
      await transporter.sendMail({
        to,
        text: this.text({
          displayName,
          email: to,
          frontEndUrl,
          language,
          verificationCode,
        }),
        html: this.html({
          displayName,
          email: to,
          frontEndUrl,
          language,
          verificationCode,
        }),
      });
    } catch (err) {
      return false;
    }
    return true;
  }

  private html({
    displayName,
    email,
    frontEndUrl,
    language,
    verificationCode,
  } : {
    displayName: string,
    email: string,
    frontEndUrl: string,
    language: string,
    verificationCode: string,
  }): string {
    if (language === 'de') {
      return `
        <html lang='de'>
          <body>
            <h1>Hallo ${displayName}!</h1>
            <p>
              Bitte bestätige deine E-Mail-Adresse. 
              Du kannst diesen 
              <a href='${frontEndUrl}/${email}/${verificationCode}'>Verifizierungslink</a>
              verwenden oder den Verifizierungscode <i>${verificationCode}</i> direkt verwenden.
            <p>
            <p>Vielen Dank und viele Grüße,<br><br>Miracle Hides<p>
            <p>
              Dies ist eine automatisch generierte E-Mail.
              Bitte antworte nicht an diese E-Mail-Adresse.
            </p>
          </body>
        </html>
      `;
    } else {
      return `
        <html lang='en'>
          <body>
            <h1>Hello ${displayName}!</h1>
            <p>
              Please confirm your email address.
              You can use the 
              <a href='${frontEndUrl}/${email}/${verificationCode}'>verification link</a> 
              or use the verification code <i>${verificationCode}</i> directly.
            <p>
            <p>Thank you and best regards,<br><br>Miracle Hides</p>
            <p>
              This is an automatically generated email.
              Please do not reply to this email address.
            </p>
          </body>
        </html>
      `;
    }
  }

  private subject(language: string): string {
    if (language == 'de') {
      return 'Bitte bestätige deine E-Mail-Adresse';
    } else {
      return 'Please confirm your email address';
    }
  }

  private text({
    displayName,
    email,
    frontEndUrl,
    language,
    verificationCode,
  } : {
    displayName: string,
    email: string,
    frontEndUrl: string,
    language: string,
    verificationCode: string,
  }): string {
    if (language === 'de') {
      return `Hallo ${displayName},

bitte bestätige deine E-Mail-Adresse. Du kannst den folgenden Link verwenden oder den Verifizierungscode direkt verwenden.

Link: ${frontEndUrl}/${email}/${verificationCode}

Verifizierungscode: ${verificationCode}

Vielen Dank und viele Grüße,

Miracle Hides

Dies ist eine automatisch generierte E-Mail. Bitte antworte nicht an diese E-Mail-Adresse.
`;
    } else {
      return `Hello ${displayName}!

Please confirm your email address. You can use the link below or use the verification code directly.

Link: ${frontEndUrl}/${email}/${verificationCode}

Verification code: ${verificationCode}

Thank you and best regards,

Miracle Hides

This is an automatically generated email. Please do not reply to this email address.
`;
    }
  }
}
