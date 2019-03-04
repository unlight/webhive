import { inject } from 'njct';
import * as mongo from '../store/mongo';
import { EntryModel } from './entry.model';

export class EntryRepository {

    constructor(
        private readonly connection = inject('connection', () => mongo.connection),
    ) { }

    async insert(entry: EntryModel) {
        const result = await this.connection(({ db }) => {
            return db.collection('entry2').insertOne(entry);
        });
        return result;
    }
}
