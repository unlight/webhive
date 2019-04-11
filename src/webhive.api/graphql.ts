import { makeExecutableSchema, addResolveFunctionsToSchema, addSchemaLevelResolveFunction, mergeSchemas } from 'graphql-tools';
import * as category from './category/category.graphql';
import * as entry from './entry/entry.graphql';

export const schema = mergeSchemas({
    schemas: [
        category.schema,
        entry.schema,
    ],
});
