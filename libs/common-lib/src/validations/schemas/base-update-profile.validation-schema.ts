import * as Joi from 'joi';
import { Genders } from 'libs/common-lib';

export const BaseUpdateProfileValidationSchema = {
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, 'phone number')
    .optional(),
  personalNumber: Joi.string().optional(),
  dateOfBirth: Joi.date().iso().optional(),
  gender: Joi.string()
    .valid(...Object.values(Genders))
    .optional(),
};
