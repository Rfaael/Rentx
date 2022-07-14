import { getRepository, Repository } from "typeorm";

import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);

        return user;
    }

    async create({
        name,
        password,
        driver_license,
        email,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            driver_license,
            email,
            avatar,
            id,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.repository.findOne({ email });

        return user;
    }
}

export { UserRepository };
