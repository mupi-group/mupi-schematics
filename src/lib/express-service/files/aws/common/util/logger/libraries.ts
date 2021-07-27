import { format, transports } from 'winston';

const {
    combine, colorize, printf, timestamp,
} = format;

// define error levels enum
enum WinstonLogLevels {
    error = 'error',
    warn = 'warn',
    info = 'info',
    debug = 'debug',
}

// define levels constant
export const winstonLogLevels = {
    [WinstonLogLevels.error]: 0,
    [WinstonLogLevels.warn]: 1,
    [WinstonLogLevels.info]: 2,
    [WinstonLogLevels.debug]: 3,
};

// define customize log colors
const winstonLogColors = {
    [WinstonLogLevels.error.toUpperCase()]: 'red',
    [WinstonLogLevels.warn.toUpperCase()]: 'yellow',
    [WinstonLogLevels.info.toUpperCase()]: 'green',
    [WinstonLogLevels.debug.toUpperCase()]: 'magenta',
};

export const upperCase = (info) => {
    // eslint-disable-next-line no-param-reassign
    info.level = info.level.toUpperCase();
    return info;
};

export const formatPrintf = (info) => {
    const items = [
        new Date().toUTCString(),
        info.level,
    ];

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    info.label && items.push(`[${info.label}]`);
    items.push(':');
    items.push(info.message);

    if (info.durationMs !== undefined) {
        items.push(`${info.durationMs}ms`);
    }

    return items.join(' ');
};

// transport lowercase level status to uppercase
export const upperCaseLevel = format(upperCase);

// format for log
const logFormat = printf(formatPrintf);

// format for log in console
const formatForConsole = combine(
    upperCaseLevel(),
    timestamp(),
    colorize({
        level: true,
        colors: winstonLogColors,
    }),
    logFormat,
);

// export a function to get console transport instance
export const getConsoleTransportInstance = () => new transports.Console({
    format: process.env.NODE_ENV !== 'production' ? formatForConsole : null,
});

export const getLoggerLevel = () => (process.env.NODE_ENV !== 'production' ? 'debug' : 'info');
