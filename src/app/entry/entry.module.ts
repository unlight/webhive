import { AppContext } from '../../main';
import { inject } from 'njct';
import { CreateEntryDTO } from './entry.dto';
import { EntryService } from './entry.service';
import { IRouterContext } from 'koa-tree-router';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as Koa from 'koa';

export function initialize({ router }: AppContext) {
    router.on('POST', '/entry', transformEntry, createEntry);
}

export async function createEntry(context: Koa.Context, next: Function) {
    const createEntryDTO: CreateEntryDTO = context.state.createEntryDTO;
    const entryService = inject(EntryService);
    const result = await entryService.create(createEntryDTO);
    context.status = 201;
    context.body = {
        message: 'Entry created',
        data: {
            insertedId: result.insertedId,
        },
    };
}

export async function transformEntry(context: IRouterContext, next: Function) {
    const testEntry = context.request['body'];
    const createEntryDTO = plainToClass(CreateEntryDTO, testEntry);
    const errors = await validate(createEntryDTO, { validationError: { target: false } });
    if (errors.length > 0) {
        // throw error from errorlings
        context.statusCode = 400;
        throw errors;
    }
    context.state.createEntryDTO = createEntryDTO;
    return next();
}
