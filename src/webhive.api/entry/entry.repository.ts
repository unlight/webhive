import { inject } from 'njct';
import { EntryModel } from './entry.model';
import { mongoDatabaseInstance, ObjectId } from '../store/mongo';

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

    async getById(objectId: string) {
        const collection = this.database.collection('entry2');
        return collection.findOne<EntryModel>({ _id: objectId });
    }

    async find(options: Partial<EntryGetOptions>) {
        const { skip, limit, sort: $sort, filter } = { ...entryGetOptionsDefaults, ...options };
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
            .aggregate([{ $lookup }, { $match }, { $unwind }, { $sort }])
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    async getLatest() {
        return this.database.collection('entry2')
            .find()
            .sort('date', 1)
            .limit(100)
            .toArray();
    }
}
