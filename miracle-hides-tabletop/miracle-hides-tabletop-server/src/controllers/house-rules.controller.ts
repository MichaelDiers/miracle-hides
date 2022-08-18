import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  HOUSE_RULES_SERVICE,
  IHouseRulesService,
} from 'src/types/house-rules-service.interface';
import { Language } from 'src/types/language.type';
import IListHouseRulesResult from 'src/types/read-house-rules-result.interface';
import { LanguagePipe } from 'src/validation/language-pipe';

@Controller('api/house-rules')
export class HouseRulesController {
  constructor(
    @Inject(HOUSE_RULES_SERVICE)
    private readonly houseRulesService: IHouseRulesService,
  ) {}

  @Get(':language')
  async listAsync(
    @Param('language', new LanguagePipe()) language: Language,
  ): Promise<IListHouseRulesResult> {
    return this.houseRulesService.readAsync(language);
  }
}
