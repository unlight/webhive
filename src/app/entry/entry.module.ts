import { AppContext } from '../../main';
import { inject } from 'njct';
import { entryDtoValidate } from './entry-dto-validate';
import { CreateEntryDTO } from './entry.dto';
import { EntryService } from './entry.service';
import * as Koa from 'koa';

export function initialize({ router, app }: AppContext) {
    router.on('POST', '/entry', entryDtoValidate, createEntry);
}

export async function createEntry(context: Koa.Context, next: Function) {
    const createEntryDto: CreateEntryDTO = context.state.createEntryDto;
    const entryService = inject(EntryService);
    await entryService.create(createEntryDto);
    context.status = 201;
}
