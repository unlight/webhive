import { IRouterContext } from 'koa-tree-router';
import { AbstractValidator } from 'fluent-ts-validator';
import { CreateEntryDTO } from './entry.dto';

export function entryDtoValidate(context: IRouterContext, next: Function) {

}

export class CreateEntryDtoValidator extends AbstractValidator<CreateEntryDTO> {

    constructor() {
        super();

        this.validateIfString(x => x.title)
            .isNotEmpty()
            .hasMinLength(3);

        this.validateIfString(x => x.link)
            .isNotEmpty()
            .isUrl({ require_protocol: true, require_host: true });

        this.validateIfString(x => x.date)
            .isIso8601();

        this.validateIf(x => x.category)
            .fulfills(value => typeof value === 'string');

    }

}
