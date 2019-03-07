import { config } from './config';
import { ServerResponse } from 'http';
import * as Koa from 'koa';
import * as Router from 'koa-tree-router';
import * as favicon from 'koa-favicon';
import * as serve from 'koa-static';


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
    await import('./entry/entry.module').then(module => module.initialize(appContext));
    app.use(favicon(`${__dirname}/public_html/favicon.ico`));
    app.use(serve(`${__dirname}/public_html`));
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
            console.log(`Server running on port ${config.get('port')}`); // eslint-disable-line no-console
        });
    });
}
