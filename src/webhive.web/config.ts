import * as convict from 'convict';

const schema = {
    environment: {
        doc: 'The applicaton environment',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
        arg: 'node_env',
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
        default: 'http://::1:3000',
        env: 'API_URL',
    },
    secret: {
        doc: 'App secret',
        default: '',
        env: 'APP_SECRET',
    },
};

export const config = convict(schema).validate();

export type Config = typeof config;
