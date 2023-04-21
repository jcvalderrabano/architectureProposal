import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'person_Escritura' })
export class PersonEscritura {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'second_name' })
  secondName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'mote' })
  mote: string;

  @Column({ name: 'age' })
  age: number;
}
