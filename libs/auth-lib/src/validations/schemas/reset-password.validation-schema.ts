import * as Joi from 'joi';

const ResetPassword = Joi.object({
  password: Joi.string().min(6).required(),
  token: Joi.string().required(),
});

export { ResetPassword };
