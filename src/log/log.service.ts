import {
  Inject,
  Injectable,
  InternalServerErrorException,
  LoggerService,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './log.schema';
import { WinstonLogger } from '../util/logger.service';
import { SuccessResponse } from 'src/util/api.response';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<Log>,
    @Inject(WinstonLogger) private readonly logger: LoggerService,
  ) {}

  async createLog(
    level: string,
    method: string,
    originalUrl: string,
    statusCode: number,
    statusMessage: string[],
    duration: number,
  ) {
    try {
      const log = new this.logModel({
        level,
        method,
        originalUrl,
        statusCode,
        statusMessage,
        duration,
      });
      await log.save();
      level === 'info' ? this.logger.log(log) : this.logger.error(log);
    } catch (error) {
      throw new Error('Error creating log: ' + error.message);
    }
  }

  async findLogs(
    level?: string,
    method?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const filter: any = {};

    if (level) {
      filter.level = level;
    }

    if (method) {
      filter.method = method;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = startDate;
      }
      if (endDate) {
        filter.createdAt.$lte = endDate;
      }
    }

    try {
      const result = await this.logModel.find(filter).exec();
      return new SuccessResponse('Loggers retrieved successfully', result);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve loggers');
    }
  }

  async deleteOldLogs() {
    const duration = new Date();
    duration.setDate(duration.getDate() - 7);
    await this.logModel.deleteMany({ createdAt: { $lt: duration } });
  }
}
