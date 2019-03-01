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
        default: 3000,
        env: 'PORT',
        arg: 'port',
    },
    connectionString: {
        doc: 'Database connection config',
        default: 'mssql://username:password@localhost/database',
        env: 'CONNECTION_STRING',
    }
};

export const config = convict(schema).validate();

export type Config = typeof config;
