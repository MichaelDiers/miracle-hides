import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InvitationCodesDatabaseService } from '../../databases/invitation-codes-database/invitation-codes-database.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateDto } from './create.dto';
import { HashService } from 'src/services/hash/hash.service';
import { InvitationCode } from 'src/dtos/invitation-code.interface';

@Injectable()
export class InvitationCodeService {
  constructor(
    private readonly hashService: HashService,
    private readonly invitationCodesDatabaseService: InvitationCodesDatabaseService,
  ) {}

  public async createAsync(createDto: CreateDto) : Promise<InvitationCode> {
    if (await this.invitationExistsAsync(createDto.email)) {
      throw new ConflictException();
    }
    
    const code = uuidv4();
    const codeHash = this.hashService.hash(code);
    const email = createDto.email;
    const emailHash = this.hashService.hash(email);
    await this.invitationCodesDatabaseService.createAsync({
      code: await codeHash,
      email: await emailHash,
    });

    return { code, email };
  }

  private async invitationExistsAsync(email: string) : Promise<boolean> {
    const iterator = this.invitationCodesDatabaseService.readAllAsync();
    let current = iterator.next();
    while (!(await current).done) {
      const invitations = (await current).value;
      if (invitations) {
        const results = await Promise.all(
          invitations.map(({ email: emailHash }) => this.hashService.compare(email, emailHash)),
        );

        if (results.some(result => result)) {
          return true;
        }
      }

      current = iterator.next();
    }

    return false;
  }
}
