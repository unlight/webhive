import { inject } from 'njct';
import { mongoDatabaseInstance } from '../store/mongo';
import { CategoryModel } from './category.model';

/**
 * Category repository.
 */
export class CategoryRepository {

    constructor(
        private readonly database = inject('database', mongoDatabaseInstance),
    ) { }

    async findOrCreate(name: string) {
        const collection = this.database.collection('category');
        let result = await collection.findOne<CategoryModel>({ name });
        if (!result) {
            result = { name, _id: undefined };
            ({ insertedId: result._id } = await collection.insertOne(result));
        }
        return result;
    }
}
