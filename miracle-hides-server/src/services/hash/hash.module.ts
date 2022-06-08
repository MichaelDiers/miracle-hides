import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { HashService } from './hash.service';

@Module({
  exports: [HashService],
  imports: [ConfigModule],
  providers: [HashService],
})
export class HashModule {}
