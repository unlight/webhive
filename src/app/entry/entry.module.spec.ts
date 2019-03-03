import * as expect from 'expect';
import { getApp, CustomServerResponse, ThenArg } from '../../main';
import { ServerResponse } from 'http';
import * as Koa from 'koa';
const sham = require('koa-sham');

describe('entry api', () => {

    let app: ThenArg<ReturnType<typeof getApp>>;

    before(async () => {
        app = await getApp();
    });

    it.only('POST /entry', async () => {
        const response: CustomServerResponse = await sham(app, '/entry', {
            method: 'POST',
            body: {},
        }, { promise: true, resolveWithFullResponse: true });
        expect(response.statusCode).toEqual(201);
        expect(response.ctx.body).toBeTruthy();
    });
});
