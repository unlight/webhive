import * as expect from 'expect';
import { harvestResource, createEntry, entryLink, entryDate } from './harvest.functions';
import { createReadStream } from 'fs';

describe('harvest functions', () => {

    it('resource smoke test', () => {
        expect(harvestResource).toBeTruthy();
    });

    it('harvestResource playground', async () => {
        const stream = createReadStream('fixtures/javascriptkicks.xml');
        const result = await harvestResource({ stream });
        expect(result).toBeAn(Array);
        expect(result.length).toBeGreaterThan(0);
        const [item] = result;
        // console.log("item", item);
        expect(item).toBeTruthy();
        expect(item.title).toBe('How do we');
        const entry = createEntry(item);
        // console.log("entry", entry);
    });

    it('item link', () => {
        expect(entryLink('https://javascriptkicks.com/r/157197?url=https://aurelia.io/blog/2019/03/01/how-do-we-react-part-2/')).toEqual('https://aurelia.io/blog/2019/03/01/how-do-we-react-part-2/');
    });

    // it('entry date', () => {
    //     entryDate();
    // });

});
