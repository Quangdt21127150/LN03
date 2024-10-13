import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmDTO } from './film.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

const exampleFilm = {
  film_id: 1,
  title: 'Inception',
  description: null,
  release_year: 2006,
  language_id: 1,
  original_language_id: null,
  rental_duration: 1,
  rental_rate: 0.01,
  length: 1,
  replacement_cost: 0.01,
  rating: 'PG',
  special_features: ['Deleted Scenes', 'Behind the Scenes'],
  last_update: '2006-02-14T22:03:42.000Z',
};

function successResponse(exampleData: any, message: string) {
  return {
    statusCode: 200,
    message,
    data: exampleData,
  };
}

function errorResponse(statusCode: number, message: any, error: string) {
  return {
    statusCode,
    message,
    error,
  };
}

@ApiTags('films')
@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all films' })
  @ApiResponse({
    status: 200,
    description: 'Films retrieved successfully',
    example: {
      statusCode: 200,
      message: 'Films retrieved successfully',
      data: [exampleFilm],
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to retrieve films',
    example: {
      statusCode: 500,
      message: 'Failed to retrieve films',
      data: [],
    },
  })
  findAll() {
    return this.filmService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a film by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the film' })
  @ApiResponse({
    status: 200,
    description: 'Film retrieved successfully',
    example: {
      statusCode: 200,
      message: 'Film retrieved successfully',
      data: exampleFilm,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Film not found',
    example: errorResponse(404, 'Film with id 1 not found', 'Not Found'),
  })
  findOne(@Param('id') id: number) {
    return this.filmService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new film' })
  @ApiResponse({
    status: 200,
    description: 'Film created successfully',
    example: successResponse(exampleFilm, 'Film created successfully'),
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    example: errorResponse(
      400,
      [
        'rental_duration must be a positive number',
        'rental_duration must be an integer number',
      ],
      'Bad Request',
    ),
  })
  create(@Body() filmDto: FilmDTO) {
    return this.filmService.create(filmDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a film by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the film to delete' })
  @ApiResponse({
    status: 200,
    description: 'Film deleted successfully',
    example: successResponse(exampleFilm, 'Film deleted successfully'),
  })
  @ApiResponse({
    status: 404,
    description: 'Film not found',
    example: errorResponse(404, 'Film with id 1 not found', 'Not Found'),
  })
  remove(@Param('id') id: number) {
    return this.filmService.remove(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a film by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the film to update' })
  @ApiResponse({
    status: 200,
    description: 'Film updated successfully',
    example: successResponse(exampleFilm, 'Film updated successfully'),
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    example: errorResponse(
      400,
      [
        'rental_duration must be a positive number',
        'rental_duration must be an integer number',
      ],
      'Bad Request',
    ),
  })
  @ApiResponse({
    status: 404,
    description: 'Film not found',
    example: errorResponse(404, 'Film with id 1 not found', 'Not Found'),
  })
  update(@Param('id') id: number, @Body() filmDto: FilmDTO) {
    return this.filmService.update(Number(id), filmDto);
  }

  @Get('title/:title')
  @ApiOperation({ summary: 'Retrieve films by title' })
  @ApiParam({ name: 'title', description: 'The title of the film' })
  @ApiResponse({
    status: 200,
    description: 'Film retrieved successfully',
    example: successResponse(exampleFilm, 'Film retrieved successfully'),
  })
  @ApiResponse({
    status: 404,
    description: 'Film not found',
    example: errorResponse(
      404,
      'Film with title ACADEMY DINOSAUR not found',
      'Not Found',
    ),
  })
  getByTitle(@Param('title') title: string) {
    return this.filmService.getByTitle(title);
  }

  @Get('ratings')
  @ApiOperation({ summary: 'Retrieve available ratings' })
  @ApiResponse({
    status: 200,
    description: 'Ratings retrieved successfully',
    example: successResponse(
      ['G', 'PG', 'PG-13', 'R', 'NC-17'],
      'Ratings retrieved successfully',
    ),
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to retrieve ratings',
    example: errorResponse(
      500,
      'Failed to retrieve ratings',
      'Internal Server Error',
    ),
  })
  getRatings() {
    return this.filmService.getRatings();
  }

  @Get('special_features')
  @ApiOperation({ summary: 'Retrieve special features' })
  @ApiResponse({
    status: 200,
    description: 'Special features retrieved successfully',
    example: successResponse(
      ['Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes'],
      'Special features retrieved successfully',
    ),
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to retrieve special features',
    example: errorResponse(
      500,
      'Failed to retrieve special features',
      'Internal Server Error',
    ),
  })
  getSpecialFeatures() {
    return this.filmService.getSpecialFeatures();
  }

  @Get('release_years')
  @ApiOperation({ summary: 'Retrieve release years of films' })
  @ApiResponse({
    status: 200,
    description: 'Release years retrieved successfully',
    example: successResponse(
      [2001, 2002],
      'Release years retrieved successfully',
    ),
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to retrieve release years',
    example: errorResponse(
      500,
      'Failed to retrieve release years',
      'Internal Server Error',
    ),
  })
  getReleaseYears() {
    return this.filmService.getReleaseYears();
  }

  @Get('actors/:actor_id')
  @ApiOperation({ summary: 'Retrieve films by actor ID' })
  @ApiParam({ name: 'actor_id', description: 'The ID of the actor' })
  @ApiResponse({
    status: 200,
    description: 'Films retrieved successfully',
    example: successResponse([exampleFilm], 'Films retrieved successfully'),
  })
  @ApiResponse({
    status: 404,
    description: 'No films found for this actor',
    example: errorResponse(404, 'No films found for this actor', 'Not Found'),
  })
  getFilmsByActor(@Param('actor_id') actorId: string) {
    return this.filmService.getFilmsByActor(Number(actorId));
  }
}
