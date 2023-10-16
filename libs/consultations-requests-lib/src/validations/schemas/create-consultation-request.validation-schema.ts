import * as Joi from 'joi';
import { baseConsultationRequestValidationSchema } from './base-consultation-request.validation-schema';

export const createConsultationRequestValidationSchema = Joi.object({
  ...baseConsultationRequestValidationSchema,
  specializations: Joi.array().items(Joi.number()).min(1).required(),
});
