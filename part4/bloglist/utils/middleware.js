/* eslint-disable consistent-return */
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

// Los middleware se ejecutan cada vez que se realiza una solicitud HTTP
const tokenExtractor = (request, response, next) => {
  // request.get('authorization') recoge el valor authorization de la solicitud post (post_blog)
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
