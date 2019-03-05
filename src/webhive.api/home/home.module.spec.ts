/* eslint-disable @typescript-eslint/tslint/config */
import * as expect from 'expect';
import { getApp, ThenArg, CustomServerResponse } from '../main';
import { ServerResponse } from 'http';
import { MockoDb } from 'mockodb';
import { MongoClient } from 'mongodb';
import { injector } from 'njct';
import * as Koa from 'koa';
const sham = require('koa-sham');

describe.skip('home api', () => {

    let app: ThenArg<ReturnType<typeof getApp>>;
    let mockoDb: MockoDb;

    before(async () => {
        mockoDb = await MockoDb.boot();
        const handle = await mockoDb.open();
        const client = await MongoClient.connect(handle.url.href);
        const database = client.db('webhive_test');
        await injector.provide('database', () => database);
        app = await getApp();
    });

    after(async () => {
        await mockoDb.shutdown();
    });

    it.skip('GET /', async () => {
        const response: CustomServerResponse = await sham(app, '/', { promise: true, resolveWithFullResponse: true });
        expect(response.statusCode).toEqual(200);
        expect(response.ctx.body).toContain({ app: 'webhive' });
    });
});
