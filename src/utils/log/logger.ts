import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

const { combine, timestamp, printf, colorize, errors } = format;

// Define custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create a logger instance
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Log error stack traces
    colorize(),
    logFormat
  ),
  transports: [
    // Console transport
    new transports.Console(),

    // Daily Rotate File transport
    new transports.DailyRotateFile({
      filename: path.join('logs', 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error', // Log errors and above to file
    }),
  ],
});

// Override console methods to use the logger
console.log = (message: string) => logger.info(message);
console.error = (message: string | Error) => logger.error(message instanceof Error ? message.stack : message);
console.warn = (message: string) => logger.warn(message);
console.info = (message: string) => logger.info(message);

export default logger;
