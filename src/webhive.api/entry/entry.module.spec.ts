/* eslint-disable @typescript-eslint/tslint/config, import/max-dependencies */
import expect from 'expect';
import { main, CustomServerResponse, ThenArg } from '../main';
import { CreateEntryDTO } from './entry.dto';
import { injector } from 'njct';
import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mockMongoDatabaseClose, mockMongoDatabase } from '../testing/mock-mongo-database';
import { config } from '../config';
const sham = require('koa-sham');

describe('entry api', () => {
    let app: ThenArg<ReturnType<typeof main>>;
    let mongoServer: MongoMemoryServer;
    let client: MongoClient;
    let database: Db;
    let testCreateEntryDTO = <CreateEntryDTO>{
        title: 'Nobs',
        link: 'http://totty.com/antichlor/pluteiform?a=mimicism&b=eccentrometer#viremia',
        date: '2019-03-01T15:09:24+03:00',
        category: 'Unemended',
    };
    let shamOptions = (custom?, headers?) => ({
        headers: {
            'api-token': config.get('apiToken'),
            ...(headers || {}),
        },
        promise: true,
        resolveWithFullResponse: true,
        ...(custom || {}),
    });

    before(async () => {
        ({ mongoServer, client, database } = await mockMongoDatabase());
        injector.provide('client', () => client);
        injector.provide('database', () => database);
        // Insert test data
        await database.collection('entry2').insertMany(
            [
                {
                    _id: '01',
                    title: 'title01',
                    link: 'https://foo/01',
                    date: '2001-02-03T07:20:01-05:00',
                    category_id: '03',
                },
                {
                    _id: '02',
                    title: 'title02',
                    link: 'https://foo/02',
                    date: '2002-02-03T07:20:01-05:00',
                    category_id: '04',
                },
                {
                    _id: '03',
                    title: 'title03',
                    link: 'https://foo/03',
                    date: '2003-02-03T07:20:01-05:00',
                    category_id: '03',
                },
            ],
            { forceServerObjectId: true },
        );
        await database.collection('category').insertMany(
            [
                { _id: '03', name: 'cat03' },
                { _id: '04', name: 'cat04' },
            ],
            { forceServerObjectId: true },
        );
    });

    after(async () => {
        await mockMongoDatabaseClose({ client, mongoServer });
    });

    before(async () => {
        app = await main();
    });

    it('create entry must be protected endpoint', async () => {
        const response: CustomServerResponse = await sham(
            app,
            '/entry',
            shamOptions({ method: 'POST', body: testCreateEntryDTO }, { 'api-token': 'foo' }),
        );
        expect(response.statusCode).toEqual(401);
    });

    it('GET /entry search query unwind', async () => {
        const response: CustomServerResponse = await sham(
            app,
            '/entry',
            shamOptions({ method: 'GET', qs: { q: 'title02' } }),
        );
        expect(response.statusCode).toEqual(200);
        expect(response.ctx.body).toBeAn(Array);
        expect(response.ctx.body.length).toBe(1);
        const [entry] = response.ctx.body;
        expect(entry.category).toBeTruthy();
        expect(entry.category.name).toBe('cat04');
    });

    it('POST /entry fail', async () => {
        const response: CustomServerResponse = await sham(
            app,
            '/entry',
            shamOptions({ method: 'POST', body: {} }),
        );
        expect(response.statusCode).toEqual(400);
    });

    it('POST /entry ok', async () => {
        const response: CustomServerResponse = await sham(
            app,
            '/entry',
            shamOptions({
                method: 'POST',
                body: <CreateEntryDTO>{
                    title: 'nonliving',
                    link:
                        'https://ambary.com/porphyrogenite/chlorophyllan?a=civilizedness&b=mesologic#partiality',
                    date: '2024-11-28T22:31:32-09:00',
                    category: 'Monkeyfy',
                },
            }),
        );
        expect(response.statusCode).toEqual(201);
        expect(response.ctx.body).toContain({ message: 'Entry created' });
    });

    it('GET /entry', async () => {
        const response: CustomServerResponse = await sham(
            app,
            '/entry',
            shamOptions({ method: 'GET' }),
        );
        expect(response.statusCode).toEqual(200);
        expect(response.ctx.body).toBeTruthy();
        expect(response.ctx.body).toBeAn(Array);
    });
});
