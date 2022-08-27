import { IsArray } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const descriptionsSchemaEntry = () => createSchemaEntry({
  name: 'descriptions',
  type: [String],
});

export interface IDescriptions {
  descriptions: string[];
}

export class DescriptionsDto implements IDescriptions {
  @IsArray()
  descriptions: string[];
}
