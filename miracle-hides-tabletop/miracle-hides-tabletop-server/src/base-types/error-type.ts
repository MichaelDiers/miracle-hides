import createSchemaEntry from './create-schema-entry';

export enum ErrorType {
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING',
}

export const errorTypeSchemaEntry = () => createSchemaEntry({
  stringEnum: [...Object.values(ErrorType)],
  name: 'errorType',
  type: String,
});

export interface IErrorType {
  errorType: ErrorType;
}
