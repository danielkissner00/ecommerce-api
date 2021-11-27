const joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(5).required(),
    email: joi.string().min(8).required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(5).required(),
    password: joi.string().required().min(6),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
