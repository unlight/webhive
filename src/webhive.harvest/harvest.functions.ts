import { Stream, Readable } from 'stream';
import { Ant } from './harvest.ants';
import * as url from 'url';
import * as got from 'got';
import * as FeedParser from 'feedparser';

const ucfirst = require('ucfirst');

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
        while ((item = feeds.read())) {
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

export async function createEntry(item: FeedParser.Item, ant: Ant) {
    let category = ant.defaultCategory;
    if (item.categories && item.categories.length > 0) {
        category = item.categories[0];
    }
    return {
        title: item.title,
        link: entryLink(item.link),
        date: entryDate(item),
        category: entryCategory(category),
    };
}

export function entryCategory(name: string) {
    if (name) {
        if (name[0] !== name[0].toUpperCase()) {
            name = ucfirst(name);
        }
    }
    return name;
}

export function entryLink(link: string) {
    if (!link) {
        throw new TypeError('Expected link argument not empty');
    }
    let result = link;
    if (link.startsWith('https://javascriptkicks.com/r')) {
        let components = new url.URL(link);
        let testurl = components.searchParams.get('url');
        if (!testurl) {
            throw new Error('url is empty');
        }
        if (/\/r\/(\d+)\?url=\/articles\/\1/.test(link)) {
            testurl = `https://javascriptkicks.com${testurl}`;
        }
        components = new url.URL(testurl);
        components.searchParams.delete('gi');
        components.searchParams.delete('source');
        result = components.toString();
    }
    return result;
}

export function entryDate(item: FeedParser.Item) {
    const result = new Date();
    return result;
}
