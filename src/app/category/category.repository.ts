import { inject } from 'njct';
import { toObjectId } from '../store/mongo';
import * as mongo from '../store/mongo';
import { CategoryModel } from './category.model';

export class CategoryRepository {

    constructor(
        private readonly connection = inject('connection', () => mongo.connection),
    ) { }

    async findOrCreate(name: string) {
        const result = await this.connection(async ({ db }) => {
            let category = await db.collection('category').findOne<CategoryModel>({ name });
            if (!category) {
                category = { name, _id: undefined };
                ({ insertedId: category._id } = await db.collection('category').insertOne(category));
            }
            return category;
        });
        return result;
    }
}
