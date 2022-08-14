import {
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class ListHouseRulesRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['en'])
  language: 'en';
}
