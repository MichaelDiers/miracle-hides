import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
export class UuidPipe implements PipeTransform {
  transform(value: any): string {
    if (!value || !uuid.validate(value) || uuid.version(value) !== 4) {
      throw new BadRequestException();
    }

    return value;
  }
}
