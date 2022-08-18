import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LanguagePipe implements PipeTransform {
  transform(value: any): string {
    if (value === 'en') {
      return value;
    }

    throw new BadRequestException(`Language ${value} is not supported.`);
  }
}
