import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { HouseRulesController } from './house-rules.controller';

@Module({
  controllers: [HouseRulesController],
  imports: [ServicesModule],
})
export class ControllersModule {}
