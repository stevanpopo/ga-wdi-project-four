function errorHandler(err, req, res, next){
  if(err.name === 'ValidationError'){
    err.status = 422;
    err.message = 'Unprocessable entity';
    const errors = {};
    for(const field in err.errors){
      errors[field] = err.errors[field].message;
    }
    err.errors = errors;
  }

  const status = err.status || '500';
  const message = err.message || 'Internal server error';

  res.status(status).json({ message, errors: err.errors });
  next(err);
}

module.exports = errorHandler;
