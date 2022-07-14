import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create rental", () => {
    const dayAdd24Hours = dayjs().add(1, "days").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayJsDateProvider = new DayJsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayJsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "teste",
            description: "car teste",
            daily_rate: 100,
            license_plate: "teste",
            fine_amount: 40,
            category_id: "123",
            brand: "vw",
        });
        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "511155",
            expected_return_date: dayAdd24Hours,
            user_id: "1234",
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "1234",
                car_id: "555",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for user!")
        );
    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "teste",
            expected_return_date: dayAdd24Hours,
            user_id: "1234",
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "312",
                car_id: "teste",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Cars is unavailable"));
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "123",
                car_id: "teste",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("INVALID RETURN TIME...."));
    });
});
