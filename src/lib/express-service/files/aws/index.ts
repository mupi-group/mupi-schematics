import serverless from 'serverless-http';
import setup from './app';
import { logger } from './common/util/logger';

exports.main = (event, context) => {
    setup.then(({ app }) => serverless(app))
        .then((proxy) => proxy(event, context))
        .catch((error) => logger.error(error));
};
