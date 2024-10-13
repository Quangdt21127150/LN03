import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('film')
export class Film {
  @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
  film_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'year', nullable: true })
  release_year: number | null;

  @Column({ type: 'tinyint', unsigned: true })
  language_id: number;

  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  original_language_id: number | null;

  @Column({ type: 'tinyint', unsigned: true })
  rental_duration: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  rental_rate: number;

  @Column({ type: 'smallint', unsigned: true, nullable: true })
  length: number | null;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  replacement_cost: number;

  @Column({
    type: 'enum',
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
  })
  rating: string;

  @Column({
    type: 'set',
    enum: ['Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes'],
    nullable: true,
  })
  special_features: string[] | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update: Date;
}
