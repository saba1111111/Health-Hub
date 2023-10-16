import * as Joi from 'joi';

export const createCountrySchema = Joi.object({
  name: Joi.string().required(),
});
