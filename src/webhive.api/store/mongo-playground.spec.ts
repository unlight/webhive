/* eslint-disable @typescript-eslint/tslint/config, unicorn/prevent-abbreviations */
import { MongoClient } from 'mongodb';
import { config } from '../config';
import { EntryService } from '../entry/entry.service';
import { EntryRepository } from '../entry/entry.repository';
import { inject } from 'njct';
import { mongoDatabaseInstance, mongoClientInstance } from './mongo';
import * as expect from 'expect';

describe('mongodb playground', () => {

    it.skip('create entry', async () => {
        const client = await new MongoClient(config.get('mongoUri')).connect();
        const db = client.db(config.get('mongoDb'));
        const entryCollection = db.collection('entry2');
        const { result, insertedId } = await entryCollection.insertOne({ a: new Date(), b: new Date().toString() });
        client.close();
    });

    it.skip('find one category', async () => {
        const client = await new MongoClient(config.get('mongoUri')).connect();
        const db = client.db(config.get('mongoDb'));
        const collection = db.collection('category');
        const entity = await collection.findOne({ name: 'Sponsored' });
        client.close();
    });

    it.skip('create one category', async () => {
        const client = await new MongoClient(config.get('mongoUri')).connect();
        const db = client.db(config.get('mongoDb'));
        const collection = db.collection('category');
        const { insertedId, result } = await collection.insertOne({ name: 'A1' });
        client.close();
    });

    it.skip('EntryService.create', async () => {
        const service = new EntryService();
        const { ops: [entry] } = await service.create({
            category: 'A2',
            title: 'A2 title',
            link: 'http://airmanship.com/kansa/carapacho?a=stypticity&b=prediminution#pumpkinification',
            date: '2011-03-26T06:22:20-06:00',
        });
        expect(entry).toBeTruthy();
    });

    it.skip('lookup category', async () => {
        inject('client', mongoClientInstance).connect();
        const database = inject('database', mongoDatabaseInstance);
        const collection = database.collection('entry2');
        const $lookup = {
            from: 'category',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category',
        };
        const result = await collection.aggregate([{ $lookup }])
            .limit(1)
            .toArray();
        expect(result).toBeAn(Array);
        expect(result.length).toBeGreaterThan(0);
    });

});
