import { IsBoolean, IsUUID } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const isDeletedSchemaEntry = () => createSchemaEntry({
  name: 'isDeleted',
  type: Boolean,
});

export interface IIsDeleted {
  isDeleted: boolean;
}

export class VerificationCodeDto implements IIsDeleted {
  @IsBoolean()
  isDeleted: boolean;
}
