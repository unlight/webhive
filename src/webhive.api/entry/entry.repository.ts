import { inject } from 'njct';
import { EntryModel } from './entry.model';
import { mongoDatabaseInstance } from '../store/mongo';

const entryGetOptionsDefaults = {
    sort: undefined as unknown as (object | object[]),
    skip: 0,
    limit: 100,
    filter: undefined as unknown as { [k: string]: unknown },
};

type EntryGetOptions = typeof entryGetOptionsDefaults;

/**
 * Entry repository, gets data from store.
 */
export class EntryRepository {

    constructor(
        private readonly database = inject('database', mongoDatabaseInstance),
    ) { }

    async insert(entry: EntryModel) {
        const collection = this.database.collection('entry2');
        return collection.insertOne(entry);
    }

    async getByLink(link: string) {
        const collection = this.database.collection('entry2');
        return collection.findOne({ link });
    }

    async find(options: Partial<EntryGetOptions>) {
        const { skip, limit, sort, filter } = { ...entryGetOptionsDefaults, ...options };
        const collection = this.database.collection('entry2');
        const $lookup = {
            from: 'category',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category',
        };
        const $match = filter || {};
        const $unwind = '$category';
        return collection
            .aggregate([{ $match }, { $lookup }, { $unwind }])
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .toArray();
    }
}
