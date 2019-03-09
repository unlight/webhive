import * as got from 'got';
import { AppContext } from '../main';
import { inject } from 'njct';
import { IRouterContext } from 'koa-tree-router';
import { config } from '../config';
import { readFileSync } from 'fs';
import { entryIndex } from './entry.index';
import { entrySearch } from './entry.search';
import { Entry } from './entry';

export function initialize({ router }: AppContext) {
    router.on('GET', '/', home);
    router.on('GET', '/search', search);
    router.on('GET', '/env', env);
}

export async function home(context: IRouterContext, next: Function) {
    const client = inject('client', () => got);
    const { body } = await client.get(`${config.get('apiUrl')}/entry`, { json: true });
    context.body = await entryIndex({ entries: body });
}

export async function search(context: IRouterContext, next: Function) {
    const q = context.query.q;
    const client = inject('client', () => got);
    let entries: Entry[] = [];
    if (q) {
        ({ body: entries } = await client.get(`${config.get('apiUrl')}/entry`, { json: true, query: { q } }));
    }
    context.body = await entrySearch({ entries, q });
}

async function env(context: IRouterContext, next: Function) {
    if (context.query.secret === config.get('secret')) {
        context.body = process.env;
    }
}
