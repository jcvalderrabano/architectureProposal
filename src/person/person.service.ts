import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEscritura } from './entities/personEscritura.entity';
import { Repository } from 'typeorm';
import { PaymentMethodEscritura } from './entities/paymentMethod.entity';
import { UpdatePaymentDto } from './dto/update-payment-method.dto';
import { NOMBRES } from './const/nombres.const';
import { APELLIDOS } from './const/apellidos.const';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEscritura)
    private personRepoEscritura: Repository<PersonEscritura>,
    @InjectRepository(PaymentMethodEscritura)
    private paymentMethodRepoEscritura: Repository<PaymentMethodEscritura>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const newPerson = new PersonEscritura();
    newPerson.firstName = createPersonDto.firstName;
    newPerson.secondName = createPersonDto.secondName;
    newPerson.lastName = createPersonDto.lastName;
    newPerson.mote = createPersonDto.mote;
    newPerson.age = createPersonDto.age;
    const person = await this.personRepoEscritura.save(newPerson);
    const paymentMethodNew = new PaymentMethodEscritura();
    paymentMethodNew.cardNumber = createPersonDto.cardNumber;
    paymentMethodNew.slug = createPersonDto.slug;
    paymentMethodNew.idPerson = person.id;
    const paymentMethod = await this.paymentMethodRepoEscritura.save(
      paymentMethodNew,
    );

    return {
      person,
      paymentMethod,
    };
  }

  async populate() {
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const updatePerson = new PersonEscritura();
    updatePerson.age = updatePersonDto.age;
    updatePerson.firstName = updatePersonDto.firstName;
    updatePerson.lastName = updatePersonDto.lastName;
    updatePerson.mote = updatePersonDto.mote;
    updatePerson.secondName = updatePersonDto.secondName;
    await this.personRepoEscritura.update({ id }, updatePerson);

    const person = await this.personRepoEscritura.findOne({ where: { id } });
    const paymentMethodUpdate = await this.paymentMethodRepoEscritura.findOne({
      where: { idPerson: id },
    });
    paymentMethodUpdate.cardNumber = updatePersonDto.cardNumber;
    paymentMethodUpdate.slug = updatePersonDto.slug;
    paymentMethodUpdate.idPerson = person.id;
    const paymentMethod = await this.paymentMethodRepoEscritura.save(
      paymentMethodUpdate,
    );

    return {
      person,
      paymentMethod,
    };
  }

  async remove(id: number) {
    await this.paymentMethodRepoEscritura.delete({ idPerson: id });
    return await this.personRepoEscritura.delete({ id });
  }

  async updatePaymentMethod(
    id: number,
    updatePaymentMethodDto: UpdatePaymentDto,
  ) {
    const paymentMethodUpdate = await this.paymentMethodRepoEscritura.findOne({
      where: { id },
    });
    paymentMethodUpdate.cardNumber = updatePaymentMethodDto.cardNumber;
    paymentMethodUpdate.slug = updatePaymentMethodDto.slug;
    const paymentMethod = await this.paymentMethodRepoEscritura.save(
      paymentMethodUpdate,
    );
    return {
      paymentMethod,
    };
  }
}
