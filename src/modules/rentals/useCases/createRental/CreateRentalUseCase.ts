/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";


import { IRentalsRepository } from "../../repositories/IRentalRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { };

    async execute({
        car_id,
        expected_return_date,
        user_id,
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new AppError("Cars is unavailable");
        }

        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }

        // O aluguel deve ter duração minima de 24 horas
        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareIhHours(dateNow, expected_return_date);

        if (compare < minimumHour) {
            throw new AppError("INVALID RETURN TIME....");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase };
