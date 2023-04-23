import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
  UsePipes,
  Put,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPersonsQuery } from './queries/impl/get-persons.query/get-persons.query';
import {
  mapIPaymentMethod,
  mapIPersonEscToLect,
} from './map/personLectura.map';
import { DeletePersonCommand } from './commands/impl/delete-person.command/delete-person.command';
import { UpdatePaymentDto } from './dto/update-payment-method.dto';
import { NOMBRES } from './const/nombres.const';
import { APELLIDOS } from './const/apellidos.const';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('populate')
  async populate() {
  
    const firstNames = NOMBRES;
    const lastNames = APELLIDOS;
    for (let firstName of firstNames) {
      for (let secondName of firstNames) {
        for (let lastName of lastNames) {
          const createPerson: CreatePersonDto = {
            firstName,
            secondName,
            lastName,
            mote: firstName + '-' + lastName,
            age:  Math.floor(Math.random() * 100),
            cardNumber: Math.floor(Math.random() * 100).toString(),
            slug: Math.floor(Math.random() * 100).toString()
          };
          await this.createEmployee(createPerson);
        }
      }
    }
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.personService.remove(+id);
    const deletePerson = new DeletePersonCommand();
    deletePerson.id = +id;
    await this.commandBus.execute(deletePerson);
    return response;
  }

  @Get('all')
  async getAll() {
    return await this.queryBus.execute(new GetPersonsQuery());
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createEmployee(@Body() newPerson: CreatePersonDto) {
    const response = await this.personService.create(newPerson);
    const newPersonLectura = mapIPersonEscToLect(
      response.person,
      response.paymentMethod,
    );
    await this.commandBus.execute(newPersonLectura);
    return response;
  }

  @Put(':id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePerson(
    @Param('id') id: string,
    @Body() updatePerson: CreatePersonDto,
  ) {
    const response = await this.personService.update(+id, updatePerson);
    const updatePersonLectura = mapIPersonEscToLect(
      response.person,
      response.paymentMethod,
    );
    await this.commandBus.execute(updatePersonLectura);
    return response;
  }

  @Put('payment-method/:id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePaymentMethod(
    @Param('id') id: string,
    @Body() updatePaymenMethod: UpdatePaymentDto,
  ) {
    updatePaymenMethod.id = +id;
    await this.personService.updatePaymentMethod(+id, updatePaymenMethod);
    const paymenMethod = mapIPaymentMethod(updatePaymenMethod);
    await this.commandBus.execute(paymenMethod);
  }
}
