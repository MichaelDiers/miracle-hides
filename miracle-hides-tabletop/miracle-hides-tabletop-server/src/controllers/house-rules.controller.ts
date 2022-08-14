import { Body, Controller, Get, Inject } from '@nestjs/common';
import { HOUSE_RULES_SERVICE, IHouseRulesService } from 'src/types/house-rule-service.interface';
import { ListHouseRulesRequestDto } from 'src/types/list-house-rules-request.dto';
import IListHouseRulesResult from 'src/types/list-house-rules-result.interface';

@Controller('house-rules')
export class HouseRulesController {
  constructor(
    @Inject(HOUSE_RULES_SERVICE) private readonly houseRulesService: IHouseRulesService,
  ) {    
  }

  @Get()
  async listAsync(@Body() request: ListHouseRulesRequestDto) : Promise<IListHouseRulesResult> {
    return this.houseRulesService.listAsync(request);
  }
}
