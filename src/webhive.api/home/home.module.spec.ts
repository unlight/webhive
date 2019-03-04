import * as expect from 'expect';
import { getApp, ThenArg, CustomServerResponse } from '../main';
import { ServerResponse } from 'http';
import * as Koa from 'koa';
const sham = require('koa-sham');

describe('home api', () => {

    let app: ThenArg<ReturnType<typeof getApp>>;

    before(async () => {
        app = await getApp();
    });

    it('GET /', async () => {
        const response: CustomServerResponse = await sham(app, '/', { promise: true, resolveWithFullResponse: true });
        expect(response.statusCode).toEqual(200);
        expect(response.ctx.body).toContain({ app: 'webhive' });
    });
});
