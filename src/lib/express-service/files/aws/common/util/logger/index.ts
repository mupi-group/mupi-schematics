import { createLogger } from 'winston';
import {
    getConsoleTransportInstance,
    getLoggerLevel,
    winstonLogLevels,
} from './libraries';

/**
 * @description Create an winston logger for both debug and prod levels
 */
export const logger = createLogger({
    levels: winstonLogLevels,
    level: getLoggerLevel(),
    transports: [
        getConsoleTransportInstance(),
    ],
});
