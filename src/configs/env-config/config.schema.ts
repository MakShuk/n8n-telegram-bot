import * as Joi from 'joi';
import { ENV_VALUES } from './constants';

export const configValidationSchema = Joi.object({
  PORT: Joi.number()
    .port()
    .default(ENV_VALUES.DEFAULT_VALUES.PORT)
    .description('Application port number'),

  NODE_ENV: Joi.string()
    .valid(...Object.values(ENV_VALUES.NODE_ENVIRONMENTS))
    .default(ENV_VALUES.DEFAULT_VALUES.NODE_ENV)
    .description('Node environment'),

  BOT_TOKEN: Joi.string()
    .required()
    .description('Telegraf Bot Token'),
  N8N_BASE_URL: Joi.string()
    .uri()
    .required()
    .description('Base URL для n8n'),

  N8N_API_KEY: Joi.string()
    .required()
    .description('API ключ для n8n'),

});
