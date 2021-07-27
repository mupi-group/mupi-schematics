import { Request, Response } from 'express';

/**
 * @description a sample API, for the case that using RESTful API
 * @route GET /home
 */
export const healthCheck = (request: Request, response: Response) => {
    response.status(200);
    response.send();
};
