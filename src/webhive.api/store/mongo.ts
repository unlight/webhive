import { config } from '../config';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { inject } from 'njct';

export { ObjectId };

export function toObjectId(id: string): ObjectId {
    return (<any>ObjectId)(id);
}

let mongoClient: MongoClient;

export function mongoClientInstance() {
    if (mongoClient === undefined) {
        mongoClient = new MongoClient(config.get('mongoUri'));
        mongoClient.connect(); // todo: fix me promise
    }
    return mongoClient;
}

export function mongoDatabaseInstance() {
    const client = inject('client', mongoClientInstance);
    return client.db(config.get('mongoDb'));
}

export type Database = ReturnType<typeof mongoDatabaseInstance>;
