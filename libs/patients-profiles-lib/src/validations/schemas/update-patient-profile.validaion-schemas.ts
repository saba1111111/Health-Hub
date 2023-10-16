import * as Joi from 'joi';
import { BaseUpdateProfileValidationSchema, Genders } from 'libs/common-lib';

export const UpdatePatientProfileSchema = Joi.object({
  ...BaseUpdateProfileValidationSchema,
}).min(1);
