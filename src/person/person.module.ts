import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonLectura } from './entities/personLectura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPersonsHandler } from './queries/handlers/get-persons.handler/get-persons.handler';
import { SavePersonHandler } from './commands/handler/save-person.handler/save-person.handler';
import { PersonEscritura } from './entities/personEscritura.entity';

@Module({

  imports:[TypeOrmModule.forFeature([PersonLectura, PersonEscritura]), CqrsModule],
  controllers: [PersonController],
  providers: [PersonService, GetPersonsHandler, SavePersonHandler]
})
export class PersonModule {}
