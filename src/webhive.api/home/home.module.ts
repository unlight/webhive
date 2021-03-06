import { AppContext } from '../main';
import { IRouterContext } from 'koa-tree-router';
import { config } from '../config';

export function initialize({ router }: AppContext) {
    router.on('GET', '/', home);
}

export async function home(context: IRouterContext, next: Function) {
    context.body = {
        app: 'webhive',
        environment: config.get('environment'),
    };
}
