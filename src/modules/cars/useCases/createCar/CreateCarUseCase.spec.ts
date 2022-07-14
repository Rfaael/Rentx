import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });
    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "civic",
            brand: "honda",
            category_id: "",
            daily_rate: 100,
            description: "It's a bealtifull car",
            fine_amount: 80,
            license_plate: "22f23",
        });

        expect(car).toHaveProperty("id");
    });
    it("Should not be able to create a car with a existing license plate", async () => {
        await createCarUseCase.execute({
            name: "civic2 ",
            brand: "honda",
            category_id: "",
            daily_rate: 100,
            description: "It's a bealtifull car",
            fine_amount: 80,
            license_plate: "22f23",
        });
        await expect(
            createCarUseCase.execute({
                name: "civic3 ",
                brand: "honda",
                category_id: "",
                daily_rate: 100,
                description: "It's a bealtifull car",
                fine_amount: 80,
                license_plate: "22f23",
            })
        ).rejects.toEqual(new AppError("Car Alredy Exists...."));
    });
    it("Should not be able to create a car with avaliable true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Ava ",
            brand: "honda",
            category_id: "",
            daily_rate: 100,
            description: "It's a bealtifull car",
            fine_amount: 80,
            license_plate: "2242141414f23",
        });

        expect(car.available).toBe(true);
    });
});
