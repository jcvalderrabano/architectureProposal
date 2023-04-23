import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonLectura } from 'src/person/entities/personLectura.entity';
import { DeletePersonCommand } from '../../impl/delete-person.command/delete-person.command';

@CommandHandler(DeletePersonCommand)
export class DeletePersonHandler
  implements ICommandHandler<DeletePersonCommand>
{
  constructor(
    @InjectRepository(PersonLectura)
    private personLecturaRepo: Repository<PersonLectura>,
  ) {}
  async execute(command: DeletePersonCommand) {
    return await this.personLecturaRepo.delete({ idPerson: command.id });
  }
}
