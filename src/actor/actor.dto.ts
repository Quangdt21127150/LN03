import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class ActorDTO {
  @IsString()
  @Length(1, 45)
  @Transform(({ value }) => value.trim())
  first_name: string;

  @IsString()
  @Length(1, 45)
  @Transform(({ value }) => value.trim())
  last_name: string;
}
