import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationInMemory";

import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Cars Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationRepositoryInMemory();

        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("Should be able to add a new specification to a non-existent car", async () => {
        const car_id = "1234";

        const specifications_id = ["54321"];

        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            })
        ).rejects.toEqual(new AppError("Car does not exists..."));
    });

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Ava ",
            brand: "honda",
            category_id: "category",
            daily_rate: 100,
            description: "It's a bealtifull car",
            fine_amount: 80,
            license_plate: "2242141414f23",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "teste",
            name: "number 1",
        });

        const specifications_id = ["53126"];

        const specificationCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });
        expect(specificationCars).toHaveProperty("specifications");
        expect(specificationCars.specifications.length).toBe(0);
    });
});
