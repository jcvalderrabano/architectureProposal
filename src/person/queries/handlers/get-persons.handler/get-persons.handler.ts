import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPersonsQuery } from '../../impl/get-persons.query/get-persons.query';
import { PersonLectura } from '../../../entities/personLectura.entity';
 
@QueryHandler(GetPersonsQuery)
export class GetPersonsHandler implements IQueryHandler<GetPersonsQuery> {
  constructor(
    @InjectRepository(PersonLectura) private personRepo: Repository<PersonLectura>,
  ) {}
  async execute(query: GetPersonsQuery): Promise<PersonLectura[]> {
    console.log('lectura');
    return await this.personRepo.find();
  }
}