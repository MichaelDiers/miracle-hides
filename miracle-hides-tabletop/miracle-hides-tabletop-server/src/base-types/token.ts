import createSchemaEntry from './create-schema-entry';

export const tokenSchemaEntry = () => createSchemaEntry({
  name: 'token',
  type: String,
});

export interface IToken {
  token: string;
}
