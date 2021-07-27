import prettyjson from 'prettyjson';
import { Request, Response } from 'express';
import { logger } from '@common/util/logger';
import { ApolloError } from 'apollo-server-express';

/**
 * @description errorhandler middleware formatter and logger
 * @param error
 * @param message
 * @param request
 * @param response
 */
export function handleExpressRequestError(
    error: Error,
    message: string,
    request: Request,
    response: Response,
) {
    logger.error(`Error in ${request.method} ${request.url}`);
    logger.error(message);

    if (process.env.NODE_ENV === 'production') {
        response.status(500);
        response.send('Interval Server Error');
    }
}

/**
 * @description handle apollo server's error
 * @param error
 */
export function handleApolloServerRequestError(error: ApolloError) {
    logger.error('Error from ApolloServer');
    logger.error(
        process.env.NODE_ENV === 'production'
            ? JSON.stringify(error)
            : prettyjson.render(JSON.parse(JSON.stringify(error))),
    );

    // hide stacktrace information under production
    if (process.env.NODE_ENV === 'production') {
        return new ApolloError(error.message, null, {
            response: error.extensions.response,
        });
    }

    return error;
}
