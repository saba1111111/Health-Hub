import * as Joi from 'joi';

const VerifyAccountSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.number().required(),
});

export { VerifyAccountSchema };
