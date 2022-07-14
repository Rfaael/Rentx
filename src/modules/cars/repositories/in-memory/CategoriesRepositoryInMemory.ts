import { Category } from "../../infra/typeorm/entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const newCategory = new Category();

        Object.assign(newCategory, {
            name,
            description,
        });

        this.categories.push(newCategory);
    }
    async list(): Promise<Category[]> {
        // eslint-disable-next-line prefer-destructuring
        const categories = this.categories;

        return categories;
    }
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(
            (category) => category.name === name
        );

        return category;
    }
}

export { CategoriesRepositoryInMemory };
