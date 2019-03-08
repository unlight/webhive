import * as FeedParser from 'feedparser';
import * as got from 'got';
import { ants } from './ants';
import { harvestResource, createEntry } from './harvest.functions';
import { config } from './config';
const argv = require('yargs').argv

async function program() {
    let swarm = ants;
    if (argv.ant) {
        swarm = swarm.filter(x => x.name === argv.ant);
    }
    for await (const ant of swarm) {
        let feedItems = await harvestResource({ url: ant.target });
        for await (const feedItem of feedItems) {
            const entry = createEntry(feedItem, ant);
            console.log('Saving', entry.link);
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
        }
    }
    console.log('Next run in', config.get('waitInterval'));
    setTimeout(program, config.get('waitInterval'));
}

program();
