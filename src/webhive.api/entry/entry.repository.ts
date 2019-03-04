import { inject } from 'njct';
import { EntryModel } from './entry.model';
import { mongoDatabaseInstance } from '../store/mongo';

export class EntryRepository {

    constructor(
        private readonly database = inject('database', mongoDatabaseInstance),
    ) { }

    async insert(entry: EntryModel) {
        const collection = (await this.database).collection('entry2');
        const result = await collection.insertOne(entry);
        return result;
    }
}
