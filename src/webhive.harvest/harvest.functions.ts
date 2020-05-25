import { Stream, Readable } from 'stream';
import { Ant } from './ants';
import { entryLink } from './entry-link';
import url from 'url';
import got from 'got';
import FeedParser from 'feedparser';
import striptags from 'striptags';

export type HarvestResourceArguments = {
    url?: string;
    stream?: NodeJS.ReadableStream;
};

export async function harvestResource({
    url,
    stream,
}: HarvestResourceArguments): Promise<FeedParser.Item[]> {
    if (!stream) {
        if (!url) {
            throw new TypeError('url or stream is required');
        }
        stream = got.stream(url, { rejectUnauthorized: false });
    }
    const result: FeedParser.Item[] = [];
    const feeds = new FeedParser({ normalize: true, addmeta: false, feedurl: url });
    stream.pipe(feeds);
    feeds.on('readable', function () {
        let item: FeedParser.Item;
        while ((item = feeds.read())) {
            // tslint:disable-line:no-conditional-assignment
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
        title: entryTitle(item),
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

function entryTitle(item: FeedParser.Item) {
    if (item.title) {
        return item.title;
    }
    const description = striptags(item.description, [], '\n');
    let [result] = String(description).trim().split('\n');
    if (result.length > 120) {
        result = `${result.slice(0, 120)}…`;
    }
    return result;
}
