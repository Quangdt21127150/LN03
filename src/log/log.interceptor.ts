import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl } = request;
    const startTime = Date.now();
    this.logService.deleteOldLogs();

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        this.logService
          .createLog('info', method, originalUrl, 200, ['OK'], duration)
          .catch((err) => {
            console.error('Failed to log request:', err.message);
          });
      }),
      catchError((error) => {
        let { statusCode, message } = error.response || error;
        if (!statusCode) statusCode = 500;
        const endTime = Date.now();
        const duration = endTime - startTime;

        this.logService
          .createLog(
            'error',
            method,
            originalUrl,
            statusCode,
            message,
            duration,
          )
          .catch((err) => {
            console.error('Failed to log error request:', err.message);
          });

        return throwError(() => error);
      }),
    );
  }
}
