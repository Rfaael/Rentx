import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayJsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "20514841",
            email: "user@teste.com",
            password: "12345",
            name: "user teste",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        console.log(result);
        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate a non existent user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "12345",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect...."));
    });

    it("Should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "2053213114841",
            email: "user@te321ste.com",
            password: "1232345",
            name: "user2 teste",
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrect_password",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect...."));
    });
});
