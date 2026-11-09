const AppError = require('../errors/appError');
const logger = require('../lib/logger');


function isJsonParserError(err) {
  return err.type === 'entity.parse.failed' || (err instanceof SyntaxError && err.status === 400);
}

// err	:   The error object containing information about what went wrong
// _req	:   The incoming HTTP request
// res	:   Used to send a response to the frontend
// next	:   Passes the error to another error handler

function errorHandler(err, _req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (isJsonParseError(err)) {
    res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'Request body must be valid JSON',
      },
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  logger.error('Unhandled error', {
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
    },
  });
}


module.exports = errorHandler;
