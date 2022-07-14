// AQUI VAI SER DEFINIDA A INTERFACE

import { Category } from "../infra/typeorm/entities/Category";

// INTERFACE === CONTRATO
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    list(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
