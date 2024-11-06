const { param,  validationResult } = require("express-validator");
const ApiResponse = require("./apiResponse");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error("Validation Error", 400, errors.array()).send(res);
  }
  next();
};

const validateMongoId = (field) =>
  param(field)
    .notEmpty()
    .withMessage(`${field} is required`)
    .isMongoId()
    .withMessage(`Invalid mongo ID :  ${field}`);

module.exports = { validateRequest, validateMongoId };
