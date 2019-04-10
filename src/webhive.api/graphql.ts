import { makeExecutableSchema, addResolveFunctionsToSchema, addSchemaLevelResolveFunction, mergeSchemas } from 'graphql-tools';
import { categorySchema } from './category/category.graphql-schema';

export const schema = mergeSchemas({
    schemas: [
        categorySchema,
    ],
});
