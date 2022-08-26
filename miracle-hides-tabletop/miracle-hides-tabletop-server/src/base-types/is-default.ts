import { IsBoolean } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const isDefaultSchemaEntry = () => createSchemaEntry({
  name: 'isDefault',
  type: Boolean,
});

export interface IIsDefault {
  isDefault: boolean;
}

export class IsDefaultDto implements IIsDefault {
  @IsBoolean()
  isDefault: boolean;
}