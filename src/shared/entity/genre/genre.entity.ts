import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;
}
