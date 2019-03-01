import { AppContext } from '../../main';
import { inject } from 'njct';
import { HomeService } from './home.service';
import { IRouterContext } from 'koa-tree-router';
import { config } from '../../config';

export function homeModule({ router, app }: AppContext) {
    router.on('GET', '/', home);
}

export async function home(context: IRouterContext, next: Function) {
    context.body = {
        app: 'webhive',
        environment: config.get('environment'),
        program: config.get('program'),
    };
}
