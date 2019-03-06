import { inject } from 'njct';
import { EntryModel } from './entry.model';
import { mongoDatabaseInstance } from '../store/mongo';

const entryGetOptionsDefaults = {
    sort: undefined as unknown as (object | object[]),
    skip: 0,
    limit: 100,
};

type EntryGetOptions = typeof entryGetOptionsDefaults;

export class EntryRepository {

    constructor(
        private readonly database = inject('database', mongoDatabaseInstance),
    ) { }

    async insert(entry: EntryModel) {
        const collection = (await this.database).collection('entry2');
        const result = await collection.insertOne(entry);
        return result;
    }

    async getByLink(link: string) {
        const collection = (await this.database).collection('entry2');
        const result = await collection.findOne({ link });
        return result;
    }

    async get(options: Partial<EntryGetOptions>) {
        const { skip, limit, sort } = { ...entryGetOptionsDefaults, ...options };
        const collection = (await this.database).collection('entry2');
        const result = await collection.find()
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .toArray();
        return result;
    }
}
