import {
  Controller,
  Get,
  Inject,
  Param,
} from '@nestjs/common';
import {
  HOUSE_RULES_SERVICE,
  IHouseRulesService,
  IHouseRule,
} from '../types/house-rule.types';
import { LanguagePipe } from '../validation/language-pipe';

@Controller('api/v1/house-rules')
export class HouseRulesController {
  constructor(
    @Inject(HOUSE_RULES_SERVICE)
    private readonly houseRulesService: IHouseRulesService,
  ) {}

  @Get(':language')
  async readAsync(
    @Param('language', new LanguagePipe()) language: string,
  ): Promise<IHouseRule> {
    return this.houseRulesService.readAsync(language);
  }
}
