/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string;
}


@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ id, user_id }: IRequest) {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        const minimum_daily = 1;

        if (!rental) {
            throw new AppError("Rental doesn't exists....");
        }

        // Verificar o tempo de aluguel
        const dateNow = this.dateProvider.dateNow();

        let dayly = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );

        if (dayly <= 0) {
            dayly = minimum_daily;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        let total = 0;

        if (delay > 0) {
            const calculateFine = delay * car.fine_amount;
            total = calculateFine;
        }

        total += dayly * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
