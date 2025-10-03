const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // default level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(), // colors for console
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(), // log to console
    new transports.File({ filename: 'app.log' }), // log to file
  ],
});

module.exports = {
  logger: logger,
};
