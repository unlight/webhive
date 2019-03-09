/* eslint-disable @typescript-eslint/tslint/config */
import { CreateEntryDTO } from './entry.dto';
import * as expect from 'expect';
import { validate, ValidatorOptions } from 'class-validator';
import { plainToClass } from 'class-transformer';

describe('validate entry', () => {

    const validateOptions: ValidatorOptions = { validationError: { target: false } };

    it('create entry valid', async () => {
        const entry = plainToClass(CreateEntryDTO, {
            title: 'Retrain',
            link: 'http://muishond.com/unpolicied/ticktacker?a=saliva&b=courge#headlight',
            date: '2019-03-02T22:08:37+08:00',
        });
        const errors = await validate(entry, validateOptions);
        expect(errors).toEqual([]);

    });

    it('create entry invalid empty', async () => {
        const entry = plainToClass(CreateEntryDTO, { title: '', link: '//annoying.com/akhoond/hypocone?a=loony&b=pladarosis#shunammite' });
        const errors = await validate(entry, validateOptions);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.find(x => x.property === 'link')).toBeTruthy();
        expect(errors.find(x => x.property === 'title')).toBeTruthy();
        expect(errors.find(x => x.property === 'date')).toBeTruthy();
    });

});
