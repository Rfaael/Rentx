import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokenRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokenRepository {
    repository: UserTokens[] = [];

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id,
        });

        this.repository.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userToken = this.repository.find(
            (ut) => ut.user_id === user_id && ut.refresh_token && refresh_token
        );
        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const userTokenId = this.repository.findIndex((ut) => ut.id === id);

        this.repository.splice(userTokenId);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.repository.find(
            (ut) => ut.refresh_token === refresh_token
        );

        return userToken;
    }
}

export { UsersTokensRepositoryInMemory };
