import * as Joi from 'joi';

export const generateSuggestionsValidationSchema = Joi.object({
  consultationRequestId: Joi.number().integer().required(),
});
