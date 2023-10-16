import * as Joi from 'joi';

export const hideOrUnhideDoctoreValidationSchema = Joi.object({
  doctorId: Joi.number().integer().required(),
});
