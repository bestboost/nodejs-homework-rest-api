import { HttpError } from "../helpers/index.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorPath = error.details[0].context.label;
      const errorMessage = `missing required ${errorPath} field`;
      return next(HttpError(400, errorMessage));
    }
    next();
  };
  return func;
};

export default validateBody;
