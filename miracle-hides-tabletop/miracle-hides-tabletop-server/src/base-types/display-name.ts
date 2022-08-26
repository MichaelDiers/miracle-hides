import { IsString, Length } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const DISPLAY_NAME_MAX_LENGTH = 256;
export const DISPLAY_NAME_MIN_LENGTH = 3;

export const displayNameSchemaEntry = () => createSchemaEntry({
  maxLength: DISPLAY_NAME_MAX_LENGTH,
  minLength: DISPLAY_NAME_MIN_LENGTH,
  name: 'displayName',
  type: String,
  unique: true,
});

export interface IDisplayName {
  displayName: string;
}

export class DisplayNameDto implements IDisplayName {
  @IsString()
  @Length(DISPLAY_NAME_MIN_LENGTH, DISPLAY_NAME_MAX_LENGTH)
  displayName: string;
}
