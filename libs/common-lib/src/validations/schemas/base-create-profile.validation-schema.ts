import * as Joi from 'joi';
import { Genders } from 'libs/common-lib';

export const BaseCreateProfileValidationSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, 'phone number')
    .required(),
  personalNumber: Joi.string().required(),
  dateOfBirth: Joi.date().iso().required(),
  gender: Joi.string()
    .valid(...Object.values(Genders))
    .required(),
};
