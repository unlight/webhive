/* eslint-disable @typescript-eslint/tslint/config */
import { entryLink } from './entry-link';
import * as expect from 'expect';

describe('entryLink', () => {

    it('javascriptkicks', () => {
        expect(entryLink('https://javascriptkicks.com/r/157197?url=https://aurelia.io/blog/2019/03/01/how-do-we-react-part-2/')).toEqual('https://aurelia.io/blog/2019/03/01/how-do-we-react-part-2/');
    });

    it('javascriptkicks own', () => {
        expect(entryLink('https://javascriptkicks.com/r/155645?url=/articles/155645/jsk-weekly-march-6-2019')).toEqual('https://javascriptkicks.com/articles/155645/jsk-weekly-march-6-2019');
    });

    it('gi', () => {
        expect(entryLink('https://javascriptkicks.com/r/159446?url=https://blog.bitsrc.io/so-whats-new-in-vue-2-6-d070132b2045?gi=1140a6805780')).toEqual('https://blog.bitsrc.io/so-whats-new-in-vue-2-6-d070132b2045');
    });

    it('source', () => {
        expect(entryLink('https://codeburst.io/react-360-by-example-part-3-165eedb2d0b0?source=rss----61061eb0c96b---4')).toEqual('https://codeburst.io/react-360-by-example-part-3-165eedb2d0b0');
    });
});
