import { Stream, Readable } from 'stream';
import * as url from 'url';
import * as got from 'got';
import * as FeedParser from 'feedparser';

export type HarvestResourceArguments = {
    url?: string;
    stream?: Readable;
}

export async function harvestResource({ url, stream }: HarvestResourceArguments): Promise<FeedParser.Item[]> {
    if (!stream) {
        stream = got.stream(url);
    }
    return new Promise<FeedParser.Item[]>((resolve, reject) => {
        const result: FeedParser.Item[] = [];
        const feeds = new FeedParser({ normalize: true, addmeta: false, feedurl: url });
        stream.pipe(feeds);
        feeds.on('readable', function() {
            let item: FeedParser.Item;
            while (item = feeds.read()) {
                result.push(item);
            }
        });
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
        category: undefined as string,
    };
}

export function entryLink(link: string) {
    if (!link) {
        throw new TypeError('Expected link argument not empty');
    }
    let result = link;
    if (link.startsWith('https://javascriptkicks.com/r')) {
        const urlobject = new url.URL(link);
        result = urlobject.searchParams.get('url');
    }
    return result;
}

export function entryDate(item: FeedParser.Item) {
    let result: Date;
    const testDate = item.date || item.pubdate || item.pubDate;
    if (testDate) {
        result = new Date(testDate);
    }
    if (!result) {
        result = new Date();
    }
    return result;
}
