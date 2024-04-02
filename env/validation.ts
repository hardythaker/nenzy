import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),

  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_URI: Joi.string().required(),

  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC: Joi.number().default(900), //15mins
  REFRESH_TOKEN_VALIDITY_DURATION_IN_SEC: Joi.number().default(604800), //7d

  MAIL_HOST: Joi.string().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),

  //   PORT: Joi.number().default(3000),
});
