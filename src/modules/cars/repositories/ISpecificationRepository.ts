// AQUI VAI SER DEFINIDA A INTERFACE

import { Specification } from "../infra/typeorm/entities/Specification";

// INTERFACE === CONTRATO
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    list(): Promise<Specification[]>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
