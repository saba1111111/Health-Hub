import * as Joi from 'joi';
import { baseConsultationRequestValidationSchema } from './base-consultation-request.validation-schema';

export const updateConsultationRequestValidationSchema = Joi.object({
  ...baseConsultationRequestValidationSchema,
  specializations: Joi.array().items(Joi.number()),
  consultationRequestId: Joi.number().integer().required(),
}).or(
  'minAge',
  'maxAge',
  'minExperience',
  'minRatePerHour',
  'maxExperience',
  'minRatePerHour',
  'maxRatePerHour',
  'gender',
  'cities',
  'specializations',
);
