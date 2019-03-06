import * as got from 'got';
import { AppContext } from '../main';
import { inject } from 'njct';
import { IRouterContext } from 'koa-tree-router';
import { config } from '../config';

export function initialize({ router }: AppContext) {
    router.on('GET', '/', home);
}

export async function home(context: IRouterContext, next: Function) {
    const client = inject('client', () => got);
    const { body, statusCode } = await client.get(`${config.get('apiUrl')}/entry`, { json: true });
    // todo: render
    // console.log("statusCode", statusCode);
    // console.log("body", body);
}
