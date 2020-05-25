import { config } from '../config';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { inject } from 'njct';

export { ObjectId };

export function toObjectId(id: string): ObjectId {
    return (<any>ObjectId)(id); // tslint:disable-line:no-any
}

let mongoClient: MongoClient;

export function mongoClientInstance() {
    if (mongoClient === undefined) {
        mongoClient = new MongoClient(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return mongoClient;
}

export function mongoDatabaseInstance() {
    const client = inject('client', mongoClientInstance);
    if (!client.isConnected()) {
        throw new Error('Client is not connected');
    }
    return client.db(config.get('mongoDb'));
}

export type Database = ReturnType<typeof mongoDatabaseInstance>;
