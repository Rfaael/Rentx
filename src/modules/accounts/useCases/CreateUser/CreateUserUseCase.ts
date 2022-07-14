/* eslint-disable prettier/prettier */
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) { }

    async execute({
        name,
        driver_license,
        email,
        password,
    }: ICreateUserDTO): Promise<void> {

        const userAlredyExists = await this.usersRepository.findByEmail(email);

        if (userAlredyExists) {
            throw new AppError("User alredy exists");
        }

        const passwordHash = await hash(password, 8);

        this.usersRepository.create({
            name,
            driver_license,
            email,
            password: passwordHash,
        });
    }
}

export { CreateUserUseCase };
