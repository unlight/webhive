import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLResolveInfo } from 'graphql';
import { inject } from 'njct';
import { EntryService } from './entry.service';

export const typeDefs = `
    type Entry {
        id: ID!
        category: Category
    }

    type Query {
        entry(id: ID!): Entry
        entries: [Entry]
    }
`;

const entryService = inject(EntryService);

const entries = async () => {
    const result = await entryService.getLatest();
    return result;
};

const entry = async (parent, args, ctx, resolveInfo: GraphQLResolveInfo) => {
    const result = await entryService.getById(args.id);
    return result;
};

export const resolvers = {
    Query: {
        // entries,
        entry,
    },
    // Mutation: {
    // }
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});


