import { SeqTransport } from '@datalust/winston-seq';
import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class WinstonLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new DailyRotateFile({
          filename: 'logs/application.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '2k',
          maxFiles: '1d',
        }),
        new SeqTransport({
          serverUrl: 'http://localhost:5341/',
          apiKey: 'mYm89GXx4BRyGk4RSGjz',
          onError: (err) => {
            console.error('Error sending logs to Seq:', err);
          },
        }),
      ],
    });
  }

  log(message: any, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: any, context?: string) {
    this.logger.warn(message, { context });
  }
}
