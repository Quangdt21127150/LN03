import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { Film } from './film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
