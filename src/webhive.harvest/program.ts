/* eslint-disable no-console */
/* tslint:disable no-floating-promises */
import FeedParser from 'feedparser';
import got from 'got';
import { ants } from './ants';
import { harvestResource, createEntry } from './harvest.functions';
import { config } from './config';
import { inspect } from 'util';
import ms = require('ms');
import 'longjohn';
const argv = require('yargs').argv;

async function program() {
    let swarm = ants;
    if (argv.ant === '$last') {
        swarm = swarm.slice(-1);
    } else if (argv.ant) {
        swarm = swarm.filter((x) => x.name === argv.ant);
    }
    for (const ant of swarm) {
        console.group('Starting', ant.name);
        const feedItems = await harvestResource({ url: ant.target });
        for (const feedItem of feedItems) {
            const entry = createEntry(feedItem, ant);
            if (argv.save === false || argv.dryRun) {
                console.log(inspect(entry, undefined, Infinity));
                continue;
            }
            console.group('Saving', feedItem.title);
            try {
                await got.post(`${config.get('apiUrl')}/entry`, {
                    json: entry,
                    responseType: 'json',
                    headers: { 'api-token': config.get('apiToken') },
                });
                console.log(entry.link);
            } catch (err) {
                const code = err.response.body && err.response.body.code;
                switch (
                    code // tslint:disable-line:no-small-switch
                ) {
                    case 'EntryExists':
                        {
                            console.log(err.response.body.message);
                        }
                        break;
                    default:
                        throw err;
                }
            }
            console.groupEnd();
        }
        console.groupEnd();
    }
    if (!argv.once) {
        const waitInterval = config.get('waitInterval');
        console.log('Next run in', ms(waitInterval));
        setTimeout(program, waitInterval);
    }
}

program();
