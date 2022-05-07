import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "555",
            expected_return_date: new Date(),
        });

        console.log(rental);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "555",
            expected_return_date: new Date(),
        });

        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "555",
            expected_return_date: new Date(),
        });

        console.log(rental);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });
});
