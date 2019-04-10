import { makeExecutableSchema } from 'graphql-tools';
import { readFileSync } from 'fs';
import { resolvers } from './category.resolvers';

const typeDefs = readFileSync(`${__dirname}/category.graphql`).toString();

export const categorySchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
