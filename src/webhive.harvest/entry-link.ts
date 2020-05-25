import assert from 'assert';
import { URL } from 'url';
import { Item } from 'feedparser';

export function entryLink(object: string | Item) {
    if (!object) {
        throw new TypeError('Expected not empty argument');
    }
    let item: Item | undefined;
    let link: string;
    if (typeof object === 'object') {
        item = object;
        link = item.link;
        if (item.origlink) {
            link = item.origlink;
        }
    } else {
        link = object;
    }
    let result = link;
    let components: URL;
    assert(link);
    if (link.startsWith('https://javascriptkicks.com/r')) {
        components = new URL(link);
        let testurl = components.searchParams.get('url');
        if (!testurl) {
            throw new Error('url is empty');
        }
        if (/\/r\/(\d+)\?url=\/articles\/\1/.test(link)) {
            testurl = `https://javascriptkicks.com${testurl}`;
        }
        result = testurl;
    }
    components = new URL(result);
    components.searchParams.delete('gi');
    components.searchParams.delete('source');
    components.searchParams.delete('utm_source');
    components.searchParams.delete('utm_medium');
    components.searchParams.delete('utm_campaign');
    components.searchParams.delete('sk');
    result = components.toString();
    return result;
}
