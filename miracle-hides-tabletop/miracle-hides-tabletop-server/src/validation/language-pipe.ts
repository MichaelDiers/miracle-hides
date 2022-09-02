import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { LANGUAGES } from '../base-types/language-internal-name';

@Injectable()
export class LanguagePipe implements PipeTransform {
  transform(value: any): string {
    const language = (value && typeof value === 'string') ? value.toLowerCase() : '';
    if (LANGUAGES.includes(language)) {
      return language;
    }

    throw new BadRequestException(`Language ${value} is not supported.`);
  }
}
