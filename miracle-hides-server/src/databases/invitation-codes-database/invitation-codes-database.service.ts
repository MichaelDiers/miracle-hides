import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/services/config/config.service';
import { InvitationCode } from '../../dtos/invitation-code.interface';
import { createClient } from 'redis';

@Injectable()
export class InvitationCodesDatabaseService {
  private client;

  constructor(
    private readonly configService: ConfigService,
  ) {}

  public async createAsync(invitationCode: InvitationCode) : Promise<void> {
    await (await this.connectAsync()).set(invitationCode.code, invitationCode.email);
  }

  public async findOneAsync(predicate: (invitationCode: InvitationCode) => Promise<boolean>) : Promise<InvitationCode | undefined> {
    const iterator = this.readAllAsync();
    let current = iterator.next();
    while (!(await current).done) {
      const values = (await current).value;
      if (values) {
        const results = await Promise.all(values.map(predicate));
        const index = results.findIndex(result => result);
        if (index > -1) {
          return values[index];
        }
      }

      current = iterator.next();
    }
  }

  public async *readAllAsync() {
    const { pagingSize } = (await this.configService.readAsync());
    const client = await this.connectAsync();
    let entries = [];
    for await (const code of client.scanIterator()) {
      const email = await client.get(code);
      entries.push({ code, email });
      if (entries.length === pagingSize) {
        yield entries;
        entries = [];
      }
    }

    if (entries.length > 0) {
      yield entries;
    }
  }

  public async readByCodeAsync(code: string) : Promise<InvitationCode | undefined> {
    const client = await this.connectAsync();
    const email = await client.get(code);
    if (!email) {
      return;
    }

    return { code, email };
  }

  private async connectAsync() {
    if (!this.client) {
      const { invitationCodesConnectionString } = (await this.configService.readAsync());
      this.client = createClient({
        url: invitationCodesConnectionString,
      });

      await this.client.connect();
    }

    return this.client;
  }
}
