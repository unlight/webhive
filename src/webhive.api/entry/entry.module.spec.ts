/* eslint-disable @typescript-eslint/tslint/config */
import * as expect from 'expect';
import { getApp, CustomServerResponse, ThenArg } from '../main';
import { ServerResponse } from 'http';
import { CreateEntryDTO } from './entry.dto';
import { injector, inject } from 'njct';
import * as Koa from 'koa';
import { MongoClient, Db } from 'mongodb';
import { EntryRepository } from './entry.repository';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mockMongoDatabaseClose, mockMongoDatabase } from '../testing/mock-mongo-database';
import { config } from '../config';
const sham = require('koa-sham');

describe('entry api', () => {

    let app: ThenArg<ReturnType<typeof getApp>>;
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
    });

    after(async () => {
        await mockMongoDatabaseClose({ client, mongoServer });
    });

    before(async () => {
        app = await getApp();
    });

    it('create entry must be protected endpoint', async () => {
        const response: CustomServerResponse = await sham(app, '/entry', shamOptions({ method: 'POST', body: testCreateEntryDTO }, { 'api-token': 'foo' }));
        expect(response.statusCode).toEqual(401);
    });

    it('POST /entry fail', async () => {
        const response: CustomServerResponse = await sham(app, '/entry', shamOptions({ method: 'POST', body: {} }));
        expect(response.statusCode).toEqual(400);
    });

    it('POST /entry ok', async () => {
        const response: CustomServerResponse = await sham(app, '/entry', shamOptions({
            method: 'POST',
            body: <CreateEntryDTO>{
                title: 'nonliving',
                link: 'https://ambary.com/porphyrogenite/chlorophyllan?a=civilizedness&b=mesologic#partiality',
                date: '2024-11-28T22:31:32-09:00',
                category: 'Monkeyfy',
            },
        }));
        expect(response.statusCode).toEqual(201);
        expect(response.ctx.body).toContain({ message: 'Entry created' });
    });

    it('GET /entry', async () => {
        const response: CustomServerResponse = await sham(app, '/entry', shamOptions({ method: 'GET' }));
        expect(response.statusCode).toEqual(200);
        expect(response.ctx.body).toBeTruthy();
        expect(response.ctx.body).toBeAn(Array);
    });

});
