import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonLectura } from './person/entities/personLectura.entity';
import { PersonEscritura } from './person/entities/personEscritura.entity';
import { PaymentMethodEscritura } from './person/entities/paymentMethod.entity';

@Module({
  imports: [
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '123456',
      database: 'Dummy',
      entities: [PersonLectura, PersonEscritura, PaymentMethodEscritura],
      //entities: ['**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      synchronize: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
