import { IsString, Length } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const MESSAGE_MAX_LENGTH = 4096;
export const MESSAGE_MIN_LENGTH = 3;

export const messageSchemaEntry = () => createSchemaEntry({
  maxLength: MESSAGE_MAX_LENGTH,
  minLength: MESSAGE_MIN_LENGTH,
  name: 'message',
  type: String,
});

export interface IMessage {
  message: string;
}
