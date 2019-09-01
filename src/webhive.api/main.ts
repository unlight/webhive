import '@abraham/reflection'; // tslint:disable-line:no-import-side-effect
import { config } from './config';
import * as Koa from 'koa';
import * as Router from 'koa-tree-router';
import * as koaBodyparser from 'koa-bodyparser';
import { ServerResponse } from 'http';
import { inject } from 'njct';
import { mongoClientInstance } from './store/mongo';
const koaJsonError = require('koa-json-error');

if (config.get('environment') === 'development' || config.get('environment') === 'test') {
    require('longjohn');
}

type CustomContext = {
    body: any;
};

const app = new Koa();
const router = new Router();
let appInstance: typeof app;
const appContext = { app, router };

export type AppContext = typeof appContext;
export type ThenArg<T> = T extends Promise<infer U> ? U : T;
export type CustomServerResponse = ServerResponse & {
    ctx: Koa.ParameterizedContext<any, CustomContext>;
};

const mainDefaults = { listen: false };

export async function main(settings = {}) {
    const options = { ...mainDefaults, ...settings };
    if (appInstance === undefined) {
        app.use(koaJsonError());
        const client = inject('client', mongoClientInstance);
        await client.connect();
        await import('./home/home.module').then(m => m.initialize(appContext));
        await import('./entry/entry.module').then(m => m.initialize(appContext));
        app.use(koaBodyparser({ strict: false }));
        app.use(router.routes());
        let server: ReturnType<typeof app.listen>;
        if (options.listen) {
            const port = config.get('apiPort');
            server = app.listen(port, () => {
                console.log(`API server running on port ${port}`); // eslint-disable-line no-console
            });
        }
        appInstance = app;
    }
    return appInstance;
}

if (!module.parent) {
    main({ listen: true });
}
