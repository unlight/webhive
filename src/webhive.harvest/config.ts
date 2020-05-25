import convict from 'convict';

const schema = {
    environment: {
        doc: 'The applicaton environment',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
        arg: 'node_env',
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
        default: 'http://localhost:8000/api',
        env: 'API_URL',
        arg: 'api_url',
    },
    waitInterval: {
        doc: 'Wait until next run',
        format: 'duration',
        default: 55 * 60_000,
        env: 'WAIT_INTERVAL',
        arg: 'wait_interval',
    },
    apiToken: {
        doc: 'API token to access data manipulation',
        default: '0000',
        env: 'API_TOKEN',
    },
};

export const config = convict(schema).validate();

export type Config = typeof config;
