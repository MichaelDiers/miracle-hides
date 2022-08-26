import {
  Controller,
  Get,
  Inject,
  Param,
} from '@nestjs/common';
import {
  HOUSE_RULES_SERVICE,
  IHouseRulesService,
} from 'src/types/house-rules-service.interface';
import IHouseRules from 'src/types/house-rules.interface';
import { LanguagePipe } from 'src/validation/language-pipe';

@Controller('api/house-rules')
export class HouseRulesController {
  constructor(
    @Inject(HOUSE_RULES_SERVICE)
    private readonly houseRulesService: IHouseRulesService,
  ) {}

  @Get(':language')
  async readAsync(
    @Param('language', new LanguagePipe()) language: string,
  ): Promise<IHouseRules> {
    return this.houseRulesService.readAsync(language);
  }
}
