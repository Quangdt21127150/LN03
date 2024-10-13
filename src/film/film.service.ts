import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './film.entity';
import { SuccessResponse } from 'src/response/api.response';
import { FilmDTO } from './film.dto';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  async findAll() {
    try {
      const result = await this.filmRepository.find();
      return new SuccessResponse('Films retrieved successfully', result);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve films');
    }
  }

  async findOne(id: number) {
    const film = await this.filmRepository.findOneBy({ film_id: id });
    if (!film) throw new NotFoundException(`Film with id ${id} not found`);
    return new SuccessResponse(
      `Film with id ${id} retrieved successfully`,
      film,
    );
  }

  async create(filmDto: FilmDTO) {
    const film = this.filmRepository.create(filmDto);
    await this.filmRepository.save(film);
    return new SuccessResponse('Film created successfully', film);
  }

  async remove(id: number) {
    const film = await this.filmRepository.findOneBy({ film_id: id });
    if (!film) throw new NotFoundException(`Film with id ${id} not found`);

    await this.filmRepository.query(
      'DELETE FROM film_actor WHERE film_id = ?',
      [id],
    );

    await this.filmRepository.delete(id);
    return new SuccessResponse('Film deleted successfully', film);
  }

  async update(id: number, filmDto: FilmDTO) {
    await this.filmRepository.update(id, filmDto);
    const updatedFilm = await this.filmRepository.findOneBy({ film_id: id });

    if (!updatedFilm)
      throw new NotFoundException(`Film with id ${id} not found`);

    return new SuccessResponse('Film updated successfully', updatedFilm);
  }

  async getByTitle(title: string) {
    const film = await this.filmRepository.findOneBy({
      title: title.toUpperCase(),
    });
    if (!film)
      throw new NotFoundException(`Film with title ${title} not found`);

    return new SuccessResponse('Film retrieved successfully', film);
  }

  getRatings() {
    try {
      return new SuccessResponse('Ratings retrieved successfully', [
        'G',
        'PG',
        'PG-13',
        'R',
        'NC-17',
      ]);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve ratings');
    }
  }

  getSpecialFeatures() {
    try {
      return new SuccessResponse('Special features retrieved successfully', [
        'Trailers',
        'Commentaries',
        'Deleted Scenes',
        'Behind the Scenes',
      ]);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve special features',
      );
    }
  }

  async getReleaseYears() {
    try {
      const years = await this.filmRepository.query(
        'SELECT DISTINCT release_year FROM film WHERE release_year IS NOT NULL',
      );
      const result = years.map(
        (row: { release_year: number }) => row.release_year,
      );

      return new SuccessResponse(
        'Release years retrieved successfully',
        result,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve release years',
      );
    }
  }

  async getFilmsByActor(actorId: number) {
    const result = await this.filmRepository.query(
      `SELECT f.*
         FROM film AS f
         JOIN film_actor AS fa ON f.film_id = fa.film_id
         WHERE fa.actor_id = ?`,
      [actorId],
    );

    if (result.length === 0) {
      throw new NotFoundException('No films found for this actor');
    }
    return new SuccessResponse('Films retrieved successfully', result);
  }
}
