import * as FeedParser from 'feedparser';
import * as got from 'got';
import { ants } from './harvest.ants';
import { harvestResource, createEntry } from './harvest.functions';
import { config } from './config';

async function program() {
    for await (const ant of ants) {
        let feedItems = await harvestResource({ url: ant.target });
        for await (const feedItem of feedItems) {
            const entry = createEntry(feedItem, ant);
            console.log('Saving', entry.link);
            try {
                await got.post(`${config.get('apiUrl')}/entry`, { json: true, body: entry });
            } catch (e) {
                const err = e as got.Response<{ message: string }>;
                console.log(err.body.message);
                if (err.statusCode === 500) {
                    throw err;
                }
            }
        }
    }
}

program();
