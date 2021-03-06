import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create a new Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("Should be able to create a new category", async () => {
        const category = {
            name: "categoryTest",
            description: "category description teste",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        console.log(categoryCreated);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with same name", async () => {
        const category = {
            name: "categoryTest",
            description: "category description teste",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        await expect(
            createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            })
        ).rejects.toEqual(new AppError("Cateogry Alredy exists!"));
    });
});
