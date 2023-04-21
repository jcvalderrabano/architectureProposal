import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEscritura } from './entities/personEscritura.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(PersonEscritura) private personRepoEscritura: Repository<PersonEscritura>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    return await this.personRepoEscritura.insert(createPersonDto);
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
