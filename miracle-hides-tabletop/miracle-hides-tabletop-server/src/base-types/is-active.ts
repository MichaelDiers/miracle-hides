import { IsBoolean } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const isActiveSchemaEntry = () => createSchemaEntry({
  name: 'isActive',
  type: Boolean,
});

export interface IIsActive {
  isActive: boolean;
}

export class IsActiveDto implements IIsActive {
  @IsBoolean()
  isActive: boolean;
}
