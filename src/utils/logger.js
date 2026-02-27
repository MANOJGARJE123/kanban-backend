import { createLogger, format, transports } from 'winston';

const { combine, timestamp, errors, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp: time, stack }) => {
	return `${time} [${level}]: ${stack || message}`;
});

const logger = createLogger({
	level:  'info',
	format: combine(
		timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		errors({ stack: true }),
		logFormat
	),
	transports: [
		new transports.Console({
			format: combine(colorize(), logFormat)
		})
	]
});

export default logger;
