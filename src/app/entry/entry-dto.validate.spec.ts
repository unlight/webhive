import * as expect from 'expect';
import { CreateEntryDtoValidator } from './entry-dto.validate';

describe('validate entry', () => {

    it.only('create entry', () => {
        const createEntryDtoValidator = new CreateEntryDtoValidator();
        const entry: any = {};
        const result = createEntryDtoValidator.validate(entry);
        expect(result.isInvalid()).toBe(true);
        const failures = result.getFailures();
        console.log("failures", failures);
        const messages = result.getFailureMessages();
        console.log("messages", messages);
    });

});
