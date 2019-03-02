import { entryDtoSchema } from './entry-dto.validate';
import { CreateEntryDTO } from './entry.dto';
import { ValidationError } from 'joi';
import * as expect from 'expect';
import * as Joi from 'joi';

describe('validate entry', () => {

    let error: ValidationError;
    let value: any;
    const validateOptions = { abortEarly: false, allowUnknown: true, stripUnknown: true };

    it('create entry valid', () => {
        const entry: CreateEntryDTO = {
            title: 'Retrain',
            link: 'http://muishond.com/unpolicied/ticktacker?a=saliva&b=courge#headlight',
            date: '2019-03-02T22:08:37+08:00',
        };
        ({ value, error } = entryDtoSchema.validate(entry, validateOptions));
        expect(error).toBeFalsy();
    });

    it('create entry invalid empty', () => {
        const entry = { title: '', link: '//annoying.com/akhoond/hypocone?a=loony&b=pladarosis#shunammite' } as CreateEntryDTO;
        ({ value, error } = entryDtoSchema.validate(entry, validateOptions));
        expect(error).toBeTruthy();
        expect(error.message).toBeTruthy();
        expect(error.message).toContain('date');
    });

});
