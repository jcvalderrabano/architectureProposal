import { SavePersonCommand } from '../commands/impl/save-person.command/save-person.command';
import { iPersonEscritura } from '../interfaces/person-escritura.interface';
import { iPersonLectura } from '../interfaces/person-lectura.interface';

export function mapIPersonEscToLect(data: iPersonEscritura): SavePersonCommand {
  const savePerson = new SavePersonCommand();
  savePerson.age = data.age;
  savePerson.fullName =
    data.firstName + ' ' + data.secondName + ' ' + data.lastName;
  savePerson.mote = data.mote;

  console.log('savePerson',savePerson);
  return savePerson;
}
