import { InjectRepository } from "@nestjs/typeorm";
import { PersonLectura } from "src/person/entities/personLectura.entity";
import { Repository } from "typeorm";
import { UpdatePaymentMethodCommand } from "../../impl/update-payment-method.command/update-payment-method.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(UpdatePaymentMethodCommand)
export class UpdatePaymentMethodHandler implements ICommandHandler<UpdatePaymentMethodCommand>  {

    constructor(
        @InjectRepository(PersonLectura) private personLecturaRepo: Repository<PersonLectura>,
      ) {}
    async execute(command: UpdatePaymentMethodCommand) {
        const personfound = await this.personLecturaRepo.findOne({where:{idPaymentMehod: command.id}});
        personfound.cardNumber = command.cardNumber;
        personfound.slug = command.slug;
        await this.personLecturaRepo.update({idPaymentMehod : command.id},personfound);
    }
}
