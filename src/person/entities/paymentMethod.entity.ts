import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment_method_escritura' })
export class PaymentMethodEscritura {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'slug' })
  slug: string;

  @Column({ name: 'card_number' })
  cardNumber: string;

  @Column({ name: 'id_person' })
  idPerson: number;
}
