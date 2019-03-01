import * as Koa from 'koa';
import * as Router from 'koa-tree-router';
import * as koaBodyparser from 'koa-bodyparser';
import { config } from './config';
import { errorHandler } from './app/errors/errors';
import { schema } from './app/graphql';
import { catCreateValidation } from './app/cat/cat-create-validation.middleware';
import { getTrainingRequest } from './app/training-request/training-request.controller';
import { home } from './app/home/home.controller';
import { catRouter } from './app/cat';
const { ApolloServer } = require('apollo-server-koa');

// https://www.apollographql.com/docs/apollo-server/v2/api/apollo-server.html
const server = new ApolloServer({ schema });
const app = new Koa();

const router = new Router();
router.on('GET', '/training-request/:trainingRequestId', getTrainingRequest);
router.on('GET', '/', home);

server.applyMiddleware({ app });
app.use(errorHandler());
app.use(koaBodyparser({ strict: false }));

app.use(router.routes());
app.use(catRouter.routes());
app.listen(config.get('port'), () => {
    console.log(`Server running on port ${config.get('port')}`);
    console.log(`Graphql server is running running ${server.graphqlPath}`);
});
