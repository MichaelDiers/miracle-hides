import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import CreateKeysRequestDto from '../core/dtos/create-keys-request.dto';
import CreateKeysResponseDto from '../core/dtos/create-keys-response.dto';
import {
  KeyGenerator,
  KEY_GENERATOR,
  Transformer,
  TRANSFRORMER,
} from '../core/interfaces/services/services';

@Controller('keys')
export default class KeysController {
  constructor(
    @Inject(KEY_GENERATOR) private readonly keyGenerator: KeyGenerator,
    @Inject(TRANSFRORMER) private readonly transformer: Transformer,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createKeysAsync(
    @Body() createKeysRequestDto: CreateKeysRequestDto,
  ): Promise<CreateKeysResponseDto> {
    const result = await this.keyGenerator.generateAsync(
      this.transformer.createKeysRequestDtoToKeyOptions(createKeysRequestDto),
    );

    return this.transformer.keysResultToCreateKeysResponseDto(result);
  }
}
