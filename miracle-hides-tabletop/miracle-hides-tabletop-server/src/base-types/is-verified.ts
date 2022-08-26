import { IsBoolean } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const isVerifiedSchemaEntry = () => createSchemaEntry({
  name: 'isVerified',
  type: Boolean,
});

export interface IIsVerified {
  isVerfied: boolean;
}

export default class IsVerifiedDto implements IIsVerified {
  @IsBoolean()
  isVerfied: boolean;
}
