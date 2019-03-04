import { inject } from 'njct';
import { EntryModel } from './entry.model';
import { mongoDatabase } from '../store/mongo';

export class EntryRepository {

    constructor(
        private readonly database = inject('database', mongoDatabase),
    ) { }

    async insert(entry: EntryModel) {
        const collection = (await this.database).collection('entry2');
        const result = await collection.insertOne(entry);
        return result;
    }
}
