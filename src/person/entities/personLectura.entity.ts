import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'person_lectura' })
export class PersonLectura {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'mote' })
  mote: string;

  @Column({ name: 'age' })
  age: number;
}
