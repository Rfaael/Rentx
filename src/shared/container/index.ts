import { container } from "tsyringe";

import "@shared/container/providers";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationsRepository",
    SpecificationRepository
);

container.registerSingleton<IUserRepository>("UsersRepository", UserRepository);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImageRepository>(
    "CarsImagesRepository",
    CarsImageRepository
);

container.registerSingleton<IRentalsRepository>(
    "RentalRepository",
    RentalRepository
);

container.registerSingleton<IUsersTokenRepository>(
    "UsersTokenRepository",
    UsersTokenRepository
);
