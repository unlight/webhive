import { makeExecutableSchema } from 'graphql-tools';
import { inject } from 'njct';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';

export const typeDefs = `
    type Category {
        id: ID
        name: String
    }

    type Query {
        categories(count: Int): [Category]
    }
`;

const categories = async (parent, args) => {
    const categoryService = inject(CategoryService);
    const result = await categoryService.browse({ count: args.count });
    return result;
};

export const resolvers = {
    Query: {
        categories,
    },
    Category: {
        id: (category: CategoryModel) => {
            return String(category._id);
        }
    },
    // Mutation: {
    // },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
