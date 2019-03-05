/* eslint-disable @typescript-eslint/tslint/config */
import * as expect from 'expect';
import { getApp, CustomServerResponse, ThenArg } from '../main';
import { ServerResponse } from 'http';
import { CreateEntryDTO } from './entry.dto';
import { injector } from 'njct';
import * as Koa from 'koa';
import { MockoDb } from 'mockodb';
import { MongoClient } from 'mongodb';
const sham = require('koa-sham');

describe.skip('entry api', () => {

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

    it.skip('POST /entry fail', async () => {
        const response: CustomServerResponse = await sham(app, '/entry', {
            method: 'POST',
            body: {},
        }, { promise: true, resolveWithFullResponse: true });
        expect(response.statusCode).toEqual(400);
        // expect(response.ctx.body).toBeTruthy();
    });

    it.skip('POST /entry ok', async () => {
        const response: CustomServerResponse = await sham(app, '/entry', {
            method: 'POST',
            promise: true,
            resolveWithFullResponse: true,
            body: <CreateEntryDTO>{
                title: 'nonliving',
                link: 'https://ambary.com/porphyrogenite/chlorophyllan?a=civilizedness&b=mesologic#partiality',
                date: '2024-11-28T22:31:32-09:00',
                category: 'Monkeyfy',
            },

        });
        expect(response.statusCode).toEqual(201);
        expect(response.ctx.body).toContain({ message: 'Entry created' });
    });

});
