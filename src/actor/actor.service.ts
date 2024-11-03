import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from './actor.entity';
import { SuccessResponse } from '../util/api.response';
import { ActorDTO } from './actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  async findAll() {
    try {
      const result = await this.actorRepository.find();
      return new SuccessResponse('Actors retrieved successfully', result);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve actors');
    }
  }

  async findOne(id: number) {
    const actor = await this.actorRepository.findOneBy({ actor_id: id });
    if (!actor) throw new NotFoundException(`Actor with id ${id} not found`);
    return new SuccessResponse(
      `Actor with id ${id} retrieved successfully`,
      actor,
    );
  }

  async create(actorDto: ActorDTO) {
    const actor = this.actorRepository.create(actorDto);
    await this.actorRepository.save(actor);
    return new SuccessResponse('Actor created successfully', actor);
  }

  async remove(id: number) {
    const actor = await this.actorRepository.findOneBy({ actor_id: id });
    if (!actor) throw new NotFoundException(`Actor with id ${id} not found`);

    await this.actorRepository.query(
      'DELETE FROM film_actor WHERE actor_id = ?',
      [id],
    );

    await this.actorRepository.delete(id);
    return new SuccessResponse('Actor deleted successfully', actor);
  }

  async update(id: number, actorDto: ActorDTO) {
    await this.actorRepository.update(id, actorDto);
    const updatedFilm = await this.actorRepository.findOneBy({ actor_id: id });

    if (!updatedFilm)
      throw new NotFoundException(`Actor with id ${id} not found`);

    return new SuccessResponse('Actor updated successfully', updatedFilm);
  }
}
