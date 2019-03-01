import { AppContext } from '../../main';
import { inject } from 'njct';
import { IRouterContext } from 'koa-tree-router';
import { config } from '../../config';

export function harvestModule({ router, app }: AppContext) {
    router.on('GET', '/harvest', harvest);
}

export async function harvest(context: IRouterContext, next: Function) {
    // todo: make protected
    next();
}
