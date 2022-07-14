const logger = require("../utils/logger");

const requestLogger = (req, tes, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Body: ", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }
  next(error);
};

const tokenExtractor = async (request, response, next) => {
  const authorization = await request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const authorization = await request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
