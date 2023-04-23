import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonLectura } from './entities/personLectura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPersonsHandler } from './queries/handlers/get-persons.handler/get-persons.handler';
import { SavePersonHandler } from './commands/handler/save-person.handler/save-person.handler';
import { PersonEscritura } from './entities/personEscritura.entity';
import { DeletePersonHandler } from './commands/handler/delete-person.handler/delete-person.handler';
import { PaymentMethodEscritura } from './entities/paymentMethod.entity';
import { UpdatePaymentMethodCommand } from './commands/impl/update-payment-method.command/update-payment-method.command';
import { UpdatePaymentMethodHandler } from './commands/handler/update-payment-method.handler/update-payment-method.handler';

@Module({

  imports:[TypeOrmModule.forFeature([PersonLectura, PersonEscritura,PaymentMethodEscritura]), CqrsModule],
  controllers: [PersonController],
  providers: [PersonService, GetPersonsHandler, SavePersonHandler, DeletePersonHandler, UpdatePaymentMethodHandler]
})
export class PersonModule {}
