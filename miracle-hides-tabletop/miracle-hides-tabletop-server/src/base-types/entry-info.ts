import createSchemaEntry from './create-schema-entry';

const createdSchemaEntry = () => createSchemaEntry({
  name: 'created',
  type: String,
});

const createdUserSchemaEntry = () => createSchemaEntry({
  name: 'createdUser',
  type: String,
});

const updatedSchemaEntry = () => createSchemaEntry({
  name: 'updated',
  required: false,
  type: String,
});

const updateUserSchemaEntry = () => createSchemaEntry({
  name: 'updateUser',
  required: false,
  type: String,
});

export const entryInfoSchemaEntry = () => ({
  ...createdSchemaEntry(),
  ...createdUserSchemaEntry(),
  ...updatedSchemaEntry(),
  ...updateUserSchemaEntry(),
});

export interface IEntryInfo {
  created: string;
  createdUser: string;
  updated: string;
  updateUser: string;
}
