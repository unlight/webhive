import * as got from 'got';
import { config } from './config';
import { MongoClient } from 'mongodb';
import { createEntry } from './harvest.functions';
import { Ant } from './ants';
import { plainToClass } from 'class-transformer';
import { CreateEntryDTO } from '../webhive.api/entry/entry.dto';
import { validate, ValidatorOptions } from 'class-validator';
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const apiUrl = config.get('apiUrl');
console.log('apiUrl', apiUrl);

const testInvalidEntries: any[] = [];

// to run prod migration run script with arg api_url

async function main() {
    const client = await new MongoClient(process.env.MONGODB_URI1!, { useNewUrlParser: true }).connect();
    const collection = client.db('heroku_g67g5p9d').collection('entry');
    const cursor = collection.find();
    while (true) {
        const item = await cursor.next();
        if (!item) break;
        const category = entities.decode(item.category_name);
        const dummyFeed = {
            categories: [category],
            title: entities.decode(item.title),
            link: item._id,
        };
        const entry = createEntry(dummyFeed as any, { defaultCategory: 'Web' } as Ant);
        entry.date = item.date_updated || item.date;
        (<any>entry).date = entry.date.toISOString();
        entry.link = entry.link.trim();
        entry.title = entry.title.trim();
        entry.title = cleanUpHtml(entry.title);
        if (!entry.title
            || entry.title === 'null'
            || entry.title === 'undefined'
            || entry.link === '{{ site.url}}{{ post.id }}'
        ) {
            // Broken entries, e.g. empty title (it means it contaxt raw_text only and not useful for us)
            continue;
        }
        const entryEntity = plainToClass(CreateEntryDTO, entry);
        const errors = await validate(entryEntity);
        if (errors.length > 0) {
            console.log('entryEntity', entryEntity);
            console.log('errors', JSON.stringify(errors, null, 2));
            testInvalidEntries.push({ entryEntity, errors } as any);
        }
        try {
            await got.post(`${apiUrl}/entry`, { json: true, body: entry });
            console.log('entry', entry.title);
        } catch (err) {
            console.log('err', err.body, err.statusCode);
            const canContinue = err && err.body && err.body.code === 'EntryExists';
            if (!canContinue) {
                throw err;
            }
        }

    }
    await client.close();
    console.log('testInvalidEntries', JSON.stringify(testInvalidEntries, null, 2));
}

main();

function stringBeginsWith(haystack, needle) {
    return haystack.startsWith(needle);
}

function stringEndsWith(haystack: string, needle) {
    return haystack.endsWith(needle);
}

function cleanUpHtml(value) {
    value = value.trim();
    if (stringBeginsWith(value, '<!--[CDATA[')) {
        value = value.substr(11);
    } else if (stringBeginsWith(value, '[CDATA[')) {
        value = value.substr(7);
    } else if (stringBeginsWith(value, '<![CDATA[')) {
        value = value.substr(9);
    }
    if (stringEndsWith(value, ']]-->')) {
        value = value.slice(0, -5);
    } else if (stringEndsWith(value, ']]')) {
        value = value.slice(0, -2);
    } else if (stringEndsWith(value, ']]>')) {
        value = value.slice(0, -3);
    }

    value = value.replace(/&amp;(#\d+;)/gi, function() {
        var entity = '&' + arguments[1];
        return entity;
    });

    value = value.replace(/&amp;quot;/g, '"');

    return value;
}
