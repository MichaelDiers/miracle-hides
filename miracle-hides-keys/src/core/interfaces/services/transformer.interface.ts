import CreateKeysRequestDto from '../../dtos/create-keys-request.dto';
import CreateKeysResponseDto from '../../dtos/create-keys-response.dto';
import { KeyOptions, KeysResult } from '../data/data';

export interface Transformer {
  createKeysRequestDtoToKeyOptions(
    createKeysRequestDto: CreateKeysRequestDto,
  ): KeyOptions;

  keysResultToCreateKeysResponseDto(
    keysResult: KeysResult,
  ): CreateKeysResponseDto;
}

export const TRANSFRORMER = 'TRANSFRORMER';
