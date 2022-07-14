/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlredyExists = await this.categoriesRepository.findByName(
            name
        );

        if (categoryAlredyExists) {
            throw new AppError("Cateogry Alredy exists!");
        }

        this.categoriesRepository.create({ name, description });
    }
}
