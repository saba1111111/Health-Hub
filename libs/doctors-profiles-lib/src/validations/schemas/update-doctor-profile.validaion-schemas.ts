import * as Joi from 'joi';
import { BaseUpdateProfileValidationSchema } from 'libs/common-lib';

export const UpdateDoctorProfileSchema = Joi.object({
  ...BaseUpdateProfileValidationSchema,
  experienceInYears: Joi.number().integer().positive().optional(),
  ratePerHour: Joi.number().positive().optional(),
  specializationId: Joi.number().integer().positive().optional(),
  cityId: Joi.number().integer().positive().optional(),
}).min(1);
