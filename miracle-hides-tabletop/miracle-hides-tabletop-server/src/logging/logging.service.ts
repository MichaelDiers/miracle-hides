import { Injectable } from '@nestjs/common';
import { ErrorType } from '../base-types/error-type';
import { ILogEntry, ILoggingService } from '../types/logging.types';

@Injectable()
export class LoggingService implements ILoggingService{
  error(message: string, stack: string): void {
    this.log(message, stack, ErrorType.ERROR);    
  }
  
  info(message: string): void {
    if (process.env.MH_LOG_LEVEL !== 'INFO') {
      return;
    }

    this.log(message, 'no stack', ErrorType.INFO);
  }

  warning(message: string): void {
    if (process.env.MH_LOG_LEVEL !== 'INFO' && process.env.MH_LOG_LEVEL !== 'WARNING') {
      return;
    }

    this.log(message, 'no stack', ErrorType.WARNING);
  }

  private log(message: string, stack: string, errorType: ErrorType): void {
    this.logAsync({ 
      errorType,
      message,
      stack
     }).catch((err) => {});
  }

  private async logAsync(entry: ILogEntry): Promise<void> {
    console.log(entry);
  }
}
