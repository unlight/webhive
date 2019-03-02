import * as Joi from 'joi';
import { IRouterContext } from 'koa-tree-router';
import { AbstractValidator } from 'fluent-ts-validator';
import { CreateEntryDTO } from './entry.dto';

const validateOptions = { abortEarly: false, allowUnknown: true, stripUnknown: true };

export async function entryDtoValidate(context: IRouterContext, next: Function) {
    const testEntry = context.request['body'];
    const { error, value } = entryDtoSchema.validate(testEntry, validateOptions);
    if (error) {
        return next(error);
    }
    context.state.createEntryDto = value;
}

export const entryDtoSchema = Joi.object().keys({
    title: Joi.string().required().min(3),
    link: Joi.string().required().uri(),
    date: Joi.string().required().isoDate(),
    category: Joi.string().optional(),
});
