import * as FeedParser from 'feedparser';
import * as got from 'got';
import { ants } from './ants';
import { harvestResource, createEntry } from './harvest.functions';
import { config } from './config';
import ms = require('ms');
const argv = require('yargs').argv;

async function program() {
    let swarm = ants;
    if (argv.ant) {
        swarm = swarm.filter(x => x.name === argv.ant);
    }
    for (const ant of swarm) {
        console.group('Starting', ant.name);
        const feedItems = await harvestResource({ url: ant.target });
        for (const feedItem of feedItems) {
            console.group('Saving', feedItem.title);
            const entry = createEntry(feedItem, ant);
            try {
                await got.post(`${config.get('apiUrl')}/entry`, { json: true, body: entry });
            } catch (e) {
                const err = e as got.Response<{ message: string, code?: string }>;
                const code = err.body && err.body.code;
                switch (code) {
                    case 'EntryExists': {
                        console.log(err.body.message);
                    } break;
                    default:
                        throw err;
                }
            }
            console.groupEnd();
        }
        console.groupEnd();
    }
    const waitInterval = config.get('waitInterval');
    console.log('Next run in', ms(waitInterval));
    setTimeout(program, waitInterval);
}

program();
