import { CategoryRepository } from './category.repository';
import { inject } from 'njct';

const categoryRepository = inject(CategoryRepository);

const categories = async () => {
    const result = await categoryRepository.find();
    return result;
};

export const resolvers = {

    Query: {
        categories,
    },

    // Mutation: {
    // }

}
