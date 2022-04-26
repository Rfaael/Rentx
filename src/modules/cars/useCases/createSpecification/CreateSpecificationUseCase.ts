/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";



interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {

        const specificationAlredyExists = await this.specificationsRepository.findByName(name);

        if (specificationAlredyExists) {
            throw new AppError("Specification alredy exists...");
        }

        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
