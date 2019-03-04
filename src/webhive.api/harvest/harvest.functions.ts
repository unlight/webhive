import { Stream, Readable } from 'stream';
import * as url from 'url';
import * as got from 'got';
import * as FeedParser from 'feedparser';

export type HarvestResourceArguments = {
    url?: string;
    stream?: NodeJS.ReadableStream;
}

export async function harvestResource({ url, stream }: HarvestResourceArguments): Promise<FeedParser.Item[]> {
    if (!stream) {
        if (!url) {
            throw new TypeError('url or stream is required');
        }
        stream = got.stream(url);
    }
    const result: FeedParser.Item[] = [];
    const feeds = new FeedParser({ normalize: true, addmeta: false, feedurl: url });
    stream.pipe(feeds);
    feeds.on('readable', function() {
        let item: FeedParser.Item;
        while (item = feeds.read()) {
            result.push(item);
        }
    });
    return new Promise<FeedParser.Item[]>((resolve, reject) => {
        feeds.on('error', reject);
        feeds.on('end', () => {
            resolve(result);
        });
    });
}

export async function createEntry(item: FeedParser.Item) {
    return {
        title: item.title,
        link: entryLink(item.link),
        date: entryDate(item),
        category: undefined as unknown as string,
    };
}

export function entryLink(link: string) {
    if (!link) {
        throw new TypeError('Expected link argument not empty');
    }
    let result = link;
    if (link.startsWith('https://javascriptkicks.com/r')) {
        const urlobject = new url.URL(link);
        const testurl = urlobject.searchParams.get('url');
        if (!testurl) {
            throw new Error('url is empty');
        }
        result = testurl;
    }
    return result;
}

export function entryDate(item: FeedParser.Item) {
    let result: Date | undefined = undefined;
    const testDate = item.date || item.pubdate || item['pubDate'];
    if (testDate) {
        result = new Date(testDate);
    }
    if (!result) {
        result = new Date();
    }
    return result;
}
