import * as convict from 'convict';

const schema = {
    environment: {
        doc: 'The applicaton environment',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
        arg: 'node_env',
    },
    program: {
        doc: 'The program which runs code',
        format: ['node', 'tsnode', 'webpack'],
        default: 'node',
        env: 'PROGRAM',
        arg: 'program',
    },
    port: {
        format: 'port',
        default: 8000,
        env: 'PORT',
        arg: 'port',
    },
    mongoUri: {
        doc: 'MongoDB connection dsn string',
        default: 'mongodb://localhost:27017',
        env: 'MONGODB_URI',
        arg: 'mongodb_uri',
    },
    mongoDb: {
        doc: 'MongoDB name',
        default: 'webhive',
        env: 'MONGODB_NAME',
        arg: 'mongodb_name',
    },
    apiUrl: {
        doc: 'API url',
        default: 'http://localhost:3000',
        env: 'API_URL',
    },
};

export const config = convict(schema).validate();

export type Config = typeof config;
