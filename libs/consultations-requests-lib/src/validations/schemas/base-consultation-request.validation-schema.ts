import * as Joi from 'joi';
import { Genders } from 'libs/common-lib';

export const baseConsultationRequestValidationSchema = {
  minAge: Joi.number().min(18),
  maxAge: Joi.number()
    .min(18)
    .when('minAge', {
      is: Joi.number().required(),
      then: Joi.number().greater(Joi.ref('minAge')),
    }),
  minExperience: Joi.number().min(0),
  maxExperience: Joi.number().when('minExperience', {
    is: Joi.number().required(),
    then: Joi.number().greater(Joi.ref('minExperience')),
  }),
  minRatePerHour: Joi.number().min(0),
  maxRatePerHour: Joi.number().when('minRatePerHour', {
    is: Joi.number().required(),
    then: Joi.number().greater(Joi.ref('minRatePerHour')),
  }),
  gender: Joi.string().valid(...Object.values(Genders)),
  cities: Joi.array().items(Joi.number()),
};
