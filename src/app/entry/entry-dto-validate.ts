import { IRouterContext } from 'koa-tree-router';
import { CreateEntryDTO } from './entry.dto';

const validateOptions = { abortEarly: false, allowUnknown: true, stripUnknown: true };

export async function entryDtoValidate(context: IRouterContext, next: Function) {
    const testEntry = context.request['body'];
    // const { error, value } = entryDtoSchema.validate(testEntry, validateOptions);
    // if (error) {
    //     return next(error);
    // }
    // context.state.createEntryDto = value;
}
