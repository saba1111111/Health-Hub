import * as Joi from 'joi';

export const ChangePasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).required(),
  oldPassword: Joi.string().min(6).required(),
});
