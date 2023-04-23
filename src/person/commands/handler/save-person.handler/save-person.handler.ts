import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SavePersonCommand } from "../../impl/save-person.command/save-person.command";
import { PersonLectura } from "src/person/entities/personLectura.entity";
 
@CommandHandler(SavePersonCommand)
export class SavePersonHandler implements ICommandHandler<SavePersonCommand> {
 
    constructor(
        @InjectRepository(PersonLectura) private personLecturaRepo: Repository<PersonLectura>,
      ) {}
    async execute(command: SavePersonCommand) {
        const personfound = await this.personLecturaRepo.findOne({ where: {idPerson : command.id}});
        const person = new PersonLectura();
        person.idPerson = command.id;
        person.age = command.age;
        person.fullName = command.fullName;
        person.mote = command.mote;
        person.idPaymentMehod = command.idPaymentMehod;
        person.cardNumber = command.cardNumber;
        person.slug = command.slug;
        if (personfound) {
            await this.personLecturaRepo.update(personfound, person);
            return;
        }
        await this.personLecturaRepo.insert(person);
    }
}