/**
 * Structured Logger Utility
 * Replaces console.log with structured logging
 */

const LOG_LEVELS = {
    ERROR: 'ERROR',
    WARN: 'WARN',
    INFO: 'INFO',
    DEBUG: 'DEBUG'
};

const formatMessage = (level, message, meta = {}) => {
    const timestamp = new Date().toISOString();
    const metaString = Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}] ${message}${metaString}`;
};

const logger = {
    error: (message, meta = {}) => {
        const formattedMessage = formatMessage(LOG_LEVELS.ERROR, message, meta);
        // In production, this would go to a logging service (Winston, Pino, etc.)
        process.stderr.write(`${formattedMessage}\n`);
    },

    warn: (message, meta = {}) => {
        const formattedMessage = formatMessage(LOG_LEVELS.WARN, message, meta);
        process.stdout.write(`${formattedMessage}\n`);
    },

    info: (message, meta = {}) => {
        const formattedMessage = formatMessage(LOG_LEVELS.INFO, message, meta);
        process.stdout.write(`${formattedMessage}\n`);
    },

    debug: (message, meta = {}) => {
        if (process.env.NODE_ENV === 'development') {
            const formattedMessage = formatMessage(LOG_LEVELS.DEBUG, message, meta);
            process.stdout.write(`${formattedMessage}\n`);
        }
    }
};

module.exports = logger;
