/* express core modules */
import { Router } from 'express';
/* route's controllers */
import { healthCheck } from './app.controller';

const appRoute = Router();

appRoute.get('/health-check', healthCheck);

export {
    appRoute,
};
