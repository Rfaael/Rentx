/* eslint-disable prettier/prettier */
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    token: string;
    password: string
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokensRepository: IUsersTokenRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private userRepository: IUserRepository
    ) {

    }

    async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(token);

        if (!userToken) {
            throw new AppError("token Invalid");
        }

        if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
            throw new AppError("Token expired!");
        }

        const user = await this.userRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.userRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
