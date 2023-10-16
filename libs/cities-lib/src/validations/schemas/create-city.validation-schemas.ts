import * as Joi from 'joi';

export const createCitySchema = Joi.object({
  name: Joi.string().required(),
  countryId: Joi.number().integer().positive().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});
