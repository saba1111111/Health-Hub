import * as Joi from 'joi';

export const createSpecializationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  focused_areas: Joi.array().items(Joi.string()).required(),
});
