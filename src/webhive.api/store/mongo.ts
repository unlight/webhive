import { config } from '../config';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { inject } from 'njct';

export { ObjectId };

export type ExecuteConnectionOptions = {
    db: Db;
}

export async function connection<TResult = any>(execute: (options: ExecuteConnectionOptions) => Promise<TResult>) {
    const client = await new MongoClient(config.get('mongoUri')).connect();
    const db = client.db(config.get('mongoDb'));
    const result = await execute({ db });
    client.close();
    return result;
}

export type ConnectionFunc = typeof connection;

export function toObjectId(id: string): ObjectId {
    return (<any>ObjectId)(id);
}

let mongoClient: MongoClient;

export function mongoClientInstance() {
    if (mongoClient === undefined) {
        mongoClient = new MongoClient(config.get('mongoUri'), { useNewUrlParser: true });
    }
    return mongoClient;
}

export async function mongoDatabaseInstance() {
    const client = inject('client', mongoClientInstance);
    if (!client.isConnected()) {
        await client.connect();
    }
    return client.db(config.get('mongoDb'));
}

export type Database = ReturnType<typeof mongoDatabaseInstance>;
