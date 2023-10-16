import * as Joi from 'joi';
import { BaseCreateProfileValidationSchema } from 'libs/common-lib';

export const CreateDoctorProfileSchema = Joi.object({
  ...BaseCreateProfileValidationSchema,
  experienceInYears: Joi.number().integer().positive().required(),
  ratePerHour: Joi.number().positive().required(),
  specializationId: Joi.number().integer().positive().required(),
  cityId: Joi.number().integer().positive().required(),
});
