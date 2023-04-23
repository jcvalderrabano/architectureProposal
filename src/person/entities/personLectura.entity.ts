import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'person_lectura' })
export class PersonLectura {
  @PrimaryGeneratedColumn('increment', { name: 'idObject' })
  idObject: number;

  @Column({ name: 'id_person' })
  idPerson: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'mote' })
  mote: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'id_payment_method' })
  idPaymentMehod: number;

  @Column({ name: 'card_number' })
  cardNumber: string;

  @Column({ name: 'slug' })
  slug: string;
}
