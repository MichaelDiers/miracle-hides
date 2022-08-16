import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Language } from 'src/types/language.type';

@Injectable()
export class LanguagePipe implements PipeTransform {
  transform(value: any): Language {
    if (value === 'en') {
      return value as Language;
    }

    throw new BadRequestException(`Language ${value} is not supported.`);
  }
}
