import { IsNotIn, IsString, Length } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const passwordSchemaEntry = () => createSchemaEntry({
  name: 'password',
  type: String,
});

export interface IPassword {
  password: string;
}

export class PasswordDto implements IPassword {
  @IsString()
  @Length(8, 256)
  @IsNotIn(['password', 'PASSWORD', '12345678', '87654321'])
  password: string;
}
