import { config } from '../config';
import { MongoClient, Db, ObjectId } from 'mongodb';

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

const mongoClient = new MongoClient(config.get('mongoUri'), { useNewUrlParser: true });
const mongoDb = config.get('mongoDb');

export async function mongoDatabase() {
    if (!mongoClient.isConnected()) {
        await mongoClient.connect();
    }
    return mongoClient.db(mongoDb);
}

export type Database = ReturnType<typeof mongoDatabase>;
