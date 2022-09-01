import { IsBoolean } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const isBlockedSchemaEntry = () => createSchemaEntry({
  name: 'isBlocked',
  type: Boolean,
});

export interface IIsBlocked {
  isBlocked: boolean;
}

export class VerificationCodeDto implements IIsBlocked {
  @IsBoolean()
  isBlocked: boolean;
}
