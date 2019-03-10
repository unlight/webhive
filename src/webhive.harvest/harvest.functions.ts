import { Stream, Readable } from 'stream';
import { Ant } from './ants';
import { entryLink } from './entry-link';
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
        while ((item = feeds.read())) { // tslint:disable-line:no-conditional-assignment
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

export function createEntry(item: FeedParser.Item, ant: Ant) {
    let category = ant.defaultCategory;
    if (item.categories && item.categories.length > 0) {
        category = item.categories[0];
    }
    return {
        title: item.title,
        link: entryLink(item),
        date: entryDate(item),
        category: entryCategory(category),
    };
}

export function entryCategory(name: string) {
    return name;
}

export function entryDate(item: FeedParser.Item) {
    return new Date();
}
