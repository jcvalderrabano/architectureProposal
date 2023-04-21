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
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPersonsQuery } from './queries/impl/get-persons.query/get-persons.query';
import { mapIPersonEscToLect } from './map/personLectura.map';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
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
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }

  @Get('all')
  async getAll() {
    return await this.queryBus.execute(new GetPersonsQuery());
  }

  @Post('add')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createEmployee(@Body() newPerson: CreatePersonDto) {
    const response = await this.personService.create(newPerson);
    const newPersonLectura = mapIPersonEscToLect(newPerson);
    await this.commandBus.execute(newPersonLectura);
    return response;
  }
}
