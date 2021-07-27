/* express core modules */
import express, { Express, json } from 'express';

/* third-party modules and utils */
import compression from 'compression';
import errorHandler from 'errorhandler';
import { startApolloServer, apolloServerHookPlugin } from './common/util/apollo-server';
import { handleApolloServerRequestError, handleExpressRequestError } from './common/util/error-handler';

/* app module */
import { appRoute } from './module/app';

/* account module */
import { <%= classify(name) %>Module } from './module/<%= name %>';

/* initialize express app */
const app: Express = express();

/* setup plugins */
app.use(compression());
app.use(json());
app.use(errorHandler({
    log: handleExpressRequestError,
}));

/* setup app routes */
app.use('/', appRoute);

export default startApolloServer({
    app,
    modules: [<%= classify(name) %>Module],
    config: {
        formatError: handleApolloServerRequestError,
        plugins: [apolloServerHookPlugin],
    },
});
