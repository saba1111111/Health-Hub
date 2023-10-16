import * as Joi from 'joi';

export const envsSchema = Joi.object({
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().integer().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  REDIS_PORT: Joi.number().integer().required(),
  REDIS_HOST: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().integer().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().integer().required(),
  PASSWORD_RESET_SECRET: Joi.string().required(),
  PASSWORD_RESET_EXPIRATION_TIME: Joi.number().integer().required(),
  EMAIL: Joi.string().email().required(),
  EMAIL_PASSWORD: Joi.string().required(),
});
