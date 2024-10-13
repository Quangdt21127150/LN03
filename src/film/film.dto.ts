import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsPositive,
  IsEnum,
  Length,
  Min,
  Max,
  IsInt,
  IsArray,
} from 'class-validator';

export enum FilmRating {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG-13',
  R = 'R',
  NC17 = 'NC-17',
}

export enum SpecialFeature {
  Trailers = 'Trailers',
  Commentaries = 'Commentaries',
  DeletedScenes = 'Deleted Scenes',
  BehindTheScenes = 'Behind the Scenes',
}

export class FilmDTO {
  @ApiProperty({
    description: 'The title of the film',
    maxLength: 255,
    example: 'Inception',
  })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({
    description: 'The description of the film',
    required: false,
    example: null,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The release year of the film',
    required: false,
    minimum: 1900,
    maximum: new Date().getFullYear(),
  })
  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  release_year?: number;

  @ApiProperty({ description: 'The language ID', minimum: 1 })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  language_id: number;

  @ApiProperty({
    description: 'The original language ID',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  original_language_id?: number;

  @ApiProperty({ description: 'The rental duration in days', minimum: 1 })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  rental_duration: number;

  @ApiProperty({ description: 'The rental rate in dollars', minimum: 0.01 })
  @IsNotEmpty()
  @IsPositive()
  rental_rate: number;

  @ApiProperty({
    description: 'The length of the film in minutes',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  length?: number;

  @ApiProperty({
    description: 'The replacement cost in dollars',
    minimum: 0.01,
  })
  @IsNotEmpty()
  @IsPositive()
  replacement_cost: number;

  @ApiProperty({ description: 'The rating of the film', enum: FilmRating })
  @IsNotEmpty()
  @IsEnum(FilmRating)
  rating: FilmRating;

  @ApiProperty({
    description: 'The special features of the film',
    required: false,
    enum: SpecialFeature,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(SpecialFeature, { each: true })
  special_features?: SpecialFeature[];
}
