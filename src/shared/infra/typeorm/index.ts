/* eslint-disable prettier/prettier */
/* eslint-disable spaced-comment */
import { Connection, createConnection, getConnectionOptions } from 'typeorm';


export default async (host = "database"): Promise<Connection> => {

    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host,
        })
    )
}