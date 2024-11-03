import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonLogger } from './util/logger.service';

import { LoggingInterceptor } from './log/log.interceptor';
import { LogService } from './log/log.service';
import { LogController } from './log/log.controller';
import { Log, LogSchema } from './log/log.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actor/actor.entity';
import { ActorController } from './actor/actor.controller';
import { ActorService } from './actor/actor.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/logging'),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'sakila',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Actor]),
  ],
  controllers: [ActorController, LogController],
  providers: [
    ActorService,
    LogService,
    LoggingInterceptor,
    {
      provide: WinstonLogger,
      useClass: WinstonLogger,
    },
  ],
})
export class AppModule {}
