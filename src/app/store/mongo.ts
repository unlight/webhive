import { config } from '../../config';
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
