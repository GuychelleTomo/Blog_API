const ApiResponse = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new Error(message);
    return ApiResponse.error(message, 404).send(res);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    return ApiResponse.error(message, 400).send(res);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    return ApiResponse.error(message, 400).send(res);
  }

  return ApiResponse.error(
    error.message || "Server Error",
    error.statusCode || 500
  ).send(res);
};

module.exports = errorHandler;
