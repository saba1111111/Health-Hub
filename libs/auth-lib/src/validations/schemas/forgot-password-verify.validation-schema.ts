import * as Joi from 'joi';

export const ForgotPasswordVerfy = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.number().required(),
});
