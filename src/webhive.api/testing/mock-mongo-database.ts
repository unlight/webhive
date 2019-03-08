import { MongoClient } from 'mongodb';
import MongoMemoryServer from 'mongodb-memory-server';

export async function mockMongoDatabase() {
    const mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    const client = await MongoClient.connect(mongoUri, { useNewUrlParser: true });
    const database = client.db(await mongoServer.getDbName());
    return { mongoServer, database, client };
}

export async function mockMongoDatabaseClose({ client, mongoServer }: { mongoServer?: MongoMemoryServer, client?: MongoClient }) {
    if (client) {
        await client.close();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
}
