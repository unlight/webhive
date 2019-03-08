import { URL } from 'url';

export function entryLink(link: string) {
    if (!link) {
        throw new TypeError('Expected link argument not empty');
    }
    let result = link;
    let components: URL;
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
    result = components.toString();
    return result;
}
