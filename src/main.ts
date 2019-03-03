import 'reflect-metadata';
import { config } from './config';
import * as Koa from 'koa';
import * as Router from 'koa-tree-router';
import * as koaBodyparser from 'koa-bodyparser';
import { ServerResponse } from 'http';
import * as koaJsonError from 'koa-json-error';

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
    // app.use(koaJsonError());
    await import('./app/home/home.module').then(module => module.initialize(appContext));
    await import('./app/entry/entry.module').then(module => module.initialize(appContext));
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

if (module.parent == null) {
    main().then(app => {
        app.listen(config.get('port'), () => {
            console.log(`Server running on port ${config.get('port')}`);
        });
    });
}
