import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SavePersonCommand } from "../../impl/save-person.command/save-person.command";
import { PersonLectura } from "src/person/entities/personLectura.entity";
 
@CommandHandler(SavePersonCommand)
export class SavePersonHandler implements ICommandHandler<SavePersonCommand> {
 
    constructor(
        @InjectRepository(PersonLectura) private personRepo: Repository<PersonLectura>,
      ) {}
    async execute(command: SavePersonCommand) {
        console.log('Crear');  
        var person = new PersonLectura();
        person.age = command.age;
        person.fullName = command.fullName;
        person.mote = command.mote;
        await this.personRepo.insert(person);
    }
}