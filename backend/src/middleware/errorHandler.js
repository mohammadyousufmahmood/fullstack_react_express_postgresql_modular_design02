const AppError = require('../errors/appError');
const logger = require('../lib/logger');


function isJsonParserError(err) {
  return err.type === 'entity.parse.failed' || (err instanceof SyntaxError && err.status === 400);
}

// err	:   The error object containing information about what went wrong
// _req	:   The incoming HTTP request
// res	:   Used to send a response to the frontend
// next	:   Passes the error to another error handler
function errorHandler(err, req, res, next) {

  if (isJsonParserError(err)) {
    logger.error('JSON parsing error:', err);
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  if (err instanceof AppError) {
    logger.error('AppError:', err);
    return res.status(err.statusCode).json({ error: err.message, code: err.code });
  }

  logger.error('Unhandled error:', err);
  return res.status(500).json({ error: 'Internal server error' });

}

module.exports = errorHandler;
