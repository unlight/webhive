import { config } from './config';
import { ServerResponse } from 'http';
import Koa from 'koa';
import Router from 'koa-tree-router';
import favicon from 'koa-favicon';
import serve from 'koa-static';
import mount from 'koa-mount';
import { main as api } from '../webhive.api/main';

if (config.get('environment') === 'development' || config.get('environment') === 'test') {
    require('longjohn');
}

const app = new Koa();
const router = new Router();
let appInstance: typeof app;
const appContext = { app, router };

type CustomContext = {
    body: string;
};

export type AppContext = typeof appContext;
export type ThenArg<T> = T extends Promise<infer U> ? U : T;
export type CustomServerResponse = ServerResponse & {
    ctx: Koa.ParameterizedContext<{ [k: string]: any }, CustomContext>;
};

const mainDefaults = { listen: false };

export async function main(settings = mainDefaults) {
    if (appInstance === undefined) {
        const options = { ...mainDefaults, ...settings };
        await import('./entry/entry.module').then((m) => m.initialize(appContext));
        app.use(favicon(`${__dirname}/public_html/favicon.ico`));
        app.use(serve(`${__dirname}/public_html`));
        app.use(router.routes());
        app.use(mount('/frontend', serve(`${__dirname}/../webhive.frontend/dist`)));
        app.use(mount('/api', await api()));
        if (options.listen) {
            const port = config.get('port');
            app.listen(port, () => {
                console.log(`Web server running on port ${port}`); // eslint-disable-line no-console
            });
        }
        appInstance = app;
    }
    return appInstance;
}

if (!module.parent) {
    main({ listen: true });
}
