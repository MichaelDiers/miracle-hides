import { IErrorType } from '../base-types/error-type';
import { IMessage } from '../base-types/message';
import { IStack } from '../base-types/stack';

export type ILogEntry = 
  IErrorType
  & IMessage
  & IStack;

export interface ILoggingService {
  error(message: string, stack: string): void;
  info(message: string): void;
  warning(message: string): void;
}

export const LOGGING_SERVICE = 'LOGGING_SERVICE';
