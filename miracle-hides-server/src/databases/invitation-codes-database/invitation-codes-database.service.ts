import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/services/config/config.service';
import { InvitationCode } from '../../dtos/invitation-code.interface';

@Injectable()
export class InvitationCodesDatabaseService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  private readonly database : InvitationCode[] = [];

  public async createAsync(invitationCode: InvitationCode) : Promise<void> {
    this.database.push({ code: invitationCode.code, email: invitationCode.email });
  }

  public async *readAllAsync() : AsyncGenerator<InvitationCode[], void, unknown> {
    const { pagingSize } = await (await this.configService.readAsync());
    let start = 0;
    while(start < this.database.length) {
      yield this.database.slice(start, start + pagingSize);
      start += pagingSize;
    }
  }
}
