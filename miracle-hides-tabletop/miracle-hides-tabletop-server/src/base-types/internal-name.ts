import createSchemaEntry from './create-schema-entry';

export const internalNameSchemaEntry = (stringEnum?: string[]) => createSchemaEntry({
  name: 'internalName',
  stringEnum,
  type: String,
});

export default interface IInternalName {
  internalName: string;
}

export default class InternalNameDto implements IInternalName {
  internalName: string;
}
