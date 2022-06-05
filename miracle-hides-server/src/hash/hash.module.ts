import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { HashService } from './hash.service';

@Module({
  exports: [HashService],
  imports: [ConfigurationModule],
  providers: [HashService]
})
export class HashModule {}
