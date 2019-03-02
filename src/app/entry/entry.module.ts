import { AppContext } from '../../main';
import { inject } from 'njct';
import { IRouterContext } from 'koa-tree-router';
import { config } from '../../config';

export function initialize({ router, app }: AppContext) {
    router.on('POST', '/entry', validateEntryDto, createEntry);
}

export async function createEntry(context: IRouterContext, next: Function) {
    // todo: make it protected
    // context.request.body
    // context.body = {
    //     app: 'webhive',
    //     environment: config.get('environment'),
    //     program: config.get('program'),
    // };
}
