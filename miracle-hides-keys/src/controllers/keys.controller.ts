import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import CreateKeysRequestDto from '../core/dtos/create-keys-request.dto';
import CreateKeysResponseDto from '../core/dtos/create-keys-response.dto';
import {
  KeyGenerator,
  KEY_GENERATOR,
  Logger,
  LOGGER,
  Transformer,
  TRANSFRORMER,
} from '../core/interfaces/services/services';

@Controller('keys')
export default class KeysController {
  constructor(
    @Inject(KEY_GENERATOR) private readonly keyGenerator: KeyGenerator,
    @Inject(TRANSFRORMER) private readonly transformer: Transformer,
    @Inject(LOGGER) private readonly logger: Logger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createKeysAsync(
    @Body() createKeysRequestDto: CreateKeysRequestDto,
  ): Promise<CreateKeysResponseDto> {
    try {
      const result = await this.keyGenerator.generateAsync(
        this.transformer.createKeysRequestDtoToKeyOptions(createKeysRequestDto),
      );

      return this.transformer.keysResultToCreateKeysResponseDto(result);
    } catch (err: any) {
      this.logger.exceptionAsync(err.message, err.stack).catch(() => {});

      if (err instanceof HttpException) {
        throw err;
      }

      throw new InternalServerErrorException();
    }
  }
}
