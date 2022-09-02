import createSchemaEntry from './create-schema-entry';

export const STACK_MAX_LENGTH = 4096;
export const STACK_MIN_LENGTH = 3;

export const stackSchemaEntry = () => createSchemaEntry({
  maxLength: STACK_MAX_LENGTH,
  minLength: STACK_MIN_LENGTH,
  name: 'stack',
  type: String,
});

export interface IStack {
  stack: string;
}
