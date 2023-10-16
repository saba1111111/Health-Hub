import * as Joi from 'joi';

export const ForgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
