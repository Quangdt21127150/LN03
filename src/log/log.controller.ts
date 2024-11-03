import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { LogService } from './log.service';
import { LoggingInterceptor } from './log.interceptor';

@Controller('logs')
@UseInterceptors(LoggingInterceptor)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async searchLogs(
    @Query('level') level?: string,
    @Query('method') method?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    try {
      return await this.logService.findLogs(
        level,
        method,
        parsedStartDate,
        parsedEndDate,
      );
    } catch (error) {
      throw new Error('Error searching logs: ' + error.message);
    }
  }
}
