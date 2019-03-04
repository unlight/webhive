import * as expect from 'expect';
import { getApp, CustomServerResponse, ThenArg } from '../main';
import { ServerResponse } from 'http';
import { CreateEntryDTO } from './entry.dto';
import * as Koa from 'koa';
const sham = require('koa-sham');

describe('entry api', () => {

    let app: ThenArg<ReturnType<typeof getApp>>;

    before(async () => {
        app = await getApp();
    });

    it('POST /entry', async () => {
        const response: CustomServerResponse = await sham(app, '/entry', {
            method: 'POST',
            body: {},
        }, { promise: true, resolveWithFullResponse: true });
        expect(response.statusCode).toEqual(201);
        expect(response.ctx.body).toBeTruthy();
    });

    it('POST /entry', async () => {
        const response: CustomServerResponse = await sham(app, '/entry', {
            method: 'POST',
            promise: true,
            resolveWithFullResponse: true,
            body: {
                title: 'nonliving',
                link: 'https://ambary.com/porphyrogenite/chlorophyllan?a=civilizedness&b=mesologic#partiality',
                date: '2024-11-28T22:31:32-09:00',
                category: 'Monkeyfy',
            } as CreateEntryDTO,

        });
        expect(response.statusCode).toEqual(201);
        expect(response.ctx.body).toContain({ message: 'Entry created' });
    });

});
