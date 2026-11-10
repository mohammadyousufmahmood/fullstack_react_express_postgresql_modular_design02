const AppError = require('./../errors/appError');


function notFound(_req, res, _next) {
    next(new AppError(404, 'NOT_FOUND', 'Route not found  ${req.method} ${req.path}'));
}


module.export = notFound;
