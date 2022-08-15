import { Controller, Get, Inject, Param } from '@nestjs/common';
import { HOUSE_RULES_SERVICE, IHouseRulesService } from 'src/types/house-rule-service.interface';
import { Language } from 'src/types/language.type';
import IListHouseRulesResult from 'src/types/list-house-rules-result.interface';
import { LanguagePipe } from 'src/validation/language-pipe';

@Controller('house-rules')
export class HouseRulesController {
  constructor(
    @Inject(HOUSE_RULES_SERVICE) private readonly houseRulesService: IHouseRulesService,
  ) {    
  }

  @Get(':language')
  async listAsync(@Param('language', new LanguagePipe()) language: Language) : Promise<IListHouseRulesResult> {
    return this.houseRulesService.listAsync(language);
  }
}
