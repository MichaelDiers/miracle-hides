import { IsUUID } from 'class-validator';
import * as uuid from 'uuid';
import createSchemaEntry from './create-schema-entry';

export const guidSchemaEntry = (name: string = 'guid') => createSchemaEntry({
  lowercase: true,
  name,
  type: String,
  unique: true,
  validate: (value) => uuid.validate(value) && uuid.version(value) === 4,
});

export interface IGuid {
  guid: string;
}

export default class GuidDto implements IGuid {
  @IsUUID(4)
  guid: string;
}
