import * as FeedParser from 'feedparser';
import * as got from 'got';
import { ants } from './ants';
import { harvestResource, createEntry } from './harvest.functions';
import { config } from './config';
import * as minimist from 'minimist';

const argv: minimist.ParsedArgs = require('minimist')(process.argv.slice(2));

async function program() {
    let programAnts = ants;
    if (argv.ant) {
        programAnts = programAnts.filter(x => x.name === argv.ant);
    }
    for await (const ant of programAnts) {
        let feedItems = await harvestResource({ url: ant.target });
        for await (const feedItem of feedItems) {
            const entry = createEntry(feedItem, ant);
            console.log('Saving', entry.link);
            try {
                await got.post(`${config.get('apiUrl')}/entry`, { json: true, body: entry });
            } catch (e) {
                const err = e as got.Response<{ message: string, code?: string }>;
                const canContinue = err.body && err.body.code && err.body.code === 'AlreadyExists';
                if (!canContinue) {
                    throw err;
                }
            }
        }
    }
}

program();
