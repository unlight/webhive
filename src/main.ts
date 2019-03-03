import 'reflect-metadata';
import * as Koa from 'koa';
import * as Router from 'koa-tree-router';
import * as koaBodyparser from 'koa-bodyparser';
import { config } from './config';
import * as koaJsonError from 'koa-json-error';

const app = new Koa();
const router = new Router();

const appContext = { app, router };

export type AppContext = typeof appContext;

async function main() {
    app.use(koaJsonError());
    await import('./app/home/home.module').then(module => module.initialize(appContext));
    await import('./app/entry/entry.module').then(module => module.initialize(appContext));
    app.use(koaBodyparser({ strict: false }));
    app.use(router.routes());
    app.listen(config.get('port'), () => {
        console.log(`Server running on port ${config.get('port')}`);
    });
}

main();
