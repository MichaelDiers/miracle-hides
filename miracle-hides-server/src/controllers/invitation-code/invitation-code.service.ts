import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InvitationCodesDatabaseService } from '../../databases/invitation-codes-database/invitation-codes-database.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateDto } from './create.dto';
import { HashService } from 'src/services/hash/hash.service';
import { InvitationCode } from 'src/dtos/invitation-code.interface';
import { DeleteDto } from './delete.dto';

@Injectable()
export class InvitationCodeService {
  constructor(
    private readonly hashService: HashService,
    private readonly invitationCodesDatabaseService: InvitationCodesDatabaseService,
  ) {}

  public async createAsync(createDto: CreateDto) : Promise<InvitationCode> {
    if (await this.invitationCodesDatabaseService.findOneAsync(async (invitationCode) => this.hashService.compare(createDto.email, invitationCode.email))) {
      throw new ConflictException();
    }

    const code = uuidv4();
    const email = createDto.email;
    const emailHash = this.hashService.hash(email);
    await this.invitationCodesDatabaseService.createAsync({
      code,
      email: await emailHash,
    });

    return { code, email };
  }

  public async deleteAsync(deleteDto: DeleteDto) : Promise<void> {
    if (!await this.invitationCodesDatabaseService.deleteByCodeAsync(deleteDto.code)) {
      throw new NotFoundException();
    }
  }

  public async readAsync() : Promise<InvitationCode[]> {
    const iterator = this.invitationCodesDatabaseService.readAllAsync();
    let current = iterator.next();
    const invitations = [];
    while (!(await current).done) {
      const value = (await current).value;
      if (value) {
        invitations.push(...value)
      }

      current = iterator.next();
    }

    return invitations;
  }
}
