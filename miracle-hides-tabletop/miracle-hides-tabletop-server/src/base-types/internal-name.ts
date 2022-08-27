import createSchemaEntry from './create-schema-entry';

export const internalNameSchemaEntry = ({ 
  namePrefix = '',
  stringEnum,
}: {
  namePrefix?: string,
  stringEnum?: string[],
}) => createSchemaEntry({
  name: namePrefix ? `${namePrefix}InternalName` : 'internalName',
  stringEnum,
  type: String,
});

export default interface IInternalName {
  internalName: string;
}

export default class InternalNameDto implements IInternalName {
  internalName: string;
}
