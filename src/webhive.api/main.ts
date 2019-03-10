import '@abraham/reflection'; // tslint:disable-line:no-import-side-effect
import { config } from './config';
import * as Koa from 'koa';
import * as Router from 'koa-tree-router';
import * as koaBodyparser from 'koa-bodyparser';
import { ServerResponse } from 'http';
import { inject } from 'njct';
import { mongoClientInstance } from './store/mongo';
import { execSync } from 'child_process';
const koaJsonError = require('koa-json-error');

if (config.get('environment') === 'development' || config.get('environment') === 'test') {
    require('loud-rejection/register');
}
const app = new Koa();
const router = new Router();
let appInstance: typeof app;
const appContext = { app, router };

type CustomContext = {
    body: any;
};

export type AppContext = typeof appContext;
export type ThenArg<T> = T extends Promise<infer U> ? U : T;
export type CustomServerResponse = ServerResponse & {
    ctx: Koa.ParameterizedContext<any, CustomContext>;
};

async function main() {
    app.use(koaJsonError());
    const client = inject('client', mongoClientInstance);
    await client.connect();
    await import('./home/home.module').then(m => m.initialize(appContext));
    await import('./entry/entry.module').then(m => m.initialize(appContext));
    app.use(koaBodyparser({ strict: false }));
    app.use(router.routes());
    return app;
}

export async function getApp() {
    if (appInstance === undefined) {
        appInstance = await main();
    }
    return appInstance;
}

if (!module.parent) {
    main().then(app => {
        app.listen(config.get('port'), () => {
            const out = execSync('hostname').toString();
            console.log('api.hostname', out);
            console.log(`API server running on port ${config.get('port')}`); // eslint-disable-line no-console
        });
    }, err => {
        console.error(err); // eslint-disable-line no-console
    });
}
