import * as Joi from 'joi';
import { BaseCreateProfileValidationSchema } from 'libs/common-lib';

export const CreatePatientProfileSchema = Joi.object({
  ...BaseCreateProfileValidationSchema,
});
