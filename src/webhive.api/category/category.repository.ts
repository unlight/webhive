import { inject } from 'njct';
import { mongoDatabase } from '../store/mongo';
import { CategoryModel } from './category.model';

export class CategoryRepository {

    constructor(
        private readonly database = inject('database', mongoDatabase),
    ) { }

    async findOrCreate(name: string) {
        const collection = (await this.database).collection('category');
        let result = await collection.findOne<CategoryModel>({ name });
        if (!result) {
            result = { name, _id: undefined };
            ({ insertedId: result._id } = await collection.insertOne(result));
        }
        return result;
    }
}
