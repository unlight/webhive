import { AppContext } from '../../main';
import { inject } from 'njct';
import { IRouterContext } from 'koa-tree-router';
import { config } from '../../config';

export function entryModule({ router, app }: AppContext) {
    router.on('POST', '/entry', createEntry);
}

export async function createEntry(context: IRouterContext, next: Function) {

    // context.body = {
    //     app: 'webhive',
    //     environment: config.get('environment'),
    //     program: config.get('program'),
    // };
}
