import * as Joi from 'joi';
import { ROLES } from 'libs/common-lib';

export const CreateUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid(...Object.values(ROLES))
    .required(),
});
