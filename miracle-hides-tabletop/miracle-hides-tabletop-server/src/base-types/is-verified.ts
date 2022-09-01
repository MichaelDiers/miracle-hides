import { IsBoolean } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const isVerifiedSchemaEntry = (name: string = 'isVerified') => createSchemaEntry({
  name,
  type: Boolean,
});

export interface IIsVerified {
  isVerfied: boolean;
}

export default class IsVerifiedDto implements IIsVerified {
  @IsBoolean()
  isVerfied: boolean;
}
