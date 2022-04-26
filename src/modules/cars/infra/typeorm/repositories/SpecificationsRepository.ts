import { getRepository, Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }

    list(): Promise<Specification[]> {
        const specifications = this.repository.find();

        return specifications;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);

        return specifications;
    }
}

export { SpecificationRepository };