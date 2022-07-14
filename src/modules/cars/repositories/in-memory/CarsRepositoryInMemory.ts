import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        brand,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        category_id,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            brand,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            category_id,
            id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const cars = this.cars.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
        });

        return cars;
    }

    async findById(car_id: string): Promise<Car> {
        return this.cars.find((car) => car.id === car_id);
    }

    async updateAvailable(id: string, available: boolean): Promise<Car> {
        const carIndex = this.cars.findIndex((car) => car.id === id);

        this.cars[carIndex].available = available;

        return this.cars[carIndex];
    }
}

export { CarsRepositoryInMemory };
