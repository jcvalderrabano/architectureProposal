import { SavePersonCommand } from '../commands/impl/save-person.command/save-person.command';
import { UpdatePaymentMethodCommand } from '../commands/impl/update-payment-method.command/update-payment-method.command';
import { UpdatePaymentDto } from '../dto/update-payment-method.dto';
import { iPaymentMethodEscritura } from '../interfaces/paymentMethod-escritura.interface';
import { iPersonEscritura } from '../interfaces/person-escritura.interface';

export function mapIPersonEscToLect(person: iPersonEscritura, payment :iPaymentMethodEscritura): SavePersonCommand {
  const savePerson = new SavePersonCommand();
  savePerson.id = person.id;
  savePerson.age = person.age;
  savePerson.fullName =
    person.firstName + ' ' + person.secondName + ' ' + person.lastName;
  savePerson.mote = person.mote;
  savePerson.idPaymentMehod = payment.id;
  savePerson.cardNumber = payment.cardNumber;
  savePerson.slug = payment.slug;
  return savePerson;
}


export function mapIPaymentMethod(payment :UpdatePaymentDto): UpdatePaymentMethodCommand {
  const updatePaymentMethod = new UpdatePaymentMethodCommand();
  updatePaymentMethod.cardNumber = payment.cardNumber;
  updatePaymentMethod.slug = payment.slug;
  updatePaymentMethod.idPerson = payment.idPerson;
  updatePaymentMethod.id = payment.id;
  return updatePaymentMethod;
}
