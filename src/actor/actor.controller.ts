import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { LoggingInterceptor } from 'src/log/log.interceptor';
import { ActorDTO } from './actor.dto';

@Controller('actors')
@UseInterceptors(LoggingInterceptor)
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(Number(id));
  }

  @Post()
  create(@Body() actorDto: ActorDTO) {
    return this.actorService.create(actorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorService.remove(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() actorDto: ActorDTO) {
    return this.actorService.update(Number(id), actorDto);
  }
}
