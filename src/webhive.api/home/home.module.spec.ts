/* eslint-disable @typescript-eslint/tslint/config */
import expect from 'expect';
import { main, ThenArg, CustomServerResponse } from '../main';
import { ServerResponse } from 'http';
import { MongoClient, Db } from 'mongodb';
import { injector } from 'njct';
import { mockMongoDatabase, mockMongoDatabaseClose } from '../testing/mock-mongo-database';
import Koa from 'koa';
import { MongoMemoryServer } from 'mongodb-memory-server';
const sham = require('koa-sham');

describe('home api', () => {
    let app: ThenArg<ReturnType<typeof main>>;
    let mongoServer: MongoMemoryServer;
    let client: MongoClient;
    let database: Db;

    before(async () => {
        ({ mongoServer, client, database } = await mockMongoDatabase());
        injector.provide('client', () => client);
        injector.provide('database', () => database);
    });

    after(async () => {
        await mockMongoDatabaseClose({ client, mongoServer });
    });

    before(async () => {
        app = await main();
    });

    it('GET /', async () => {
        const response: CustomServerResponse = await sham(app, '/', {
            promise: true,
            resolveWithFullResponse: true,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.ctx.body).toContain({ app: 'webhive' });
    });
});
