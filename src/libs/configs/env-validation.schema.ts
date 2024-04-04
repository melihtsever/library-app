import * as Joi from 'joi';
import { name, version } from '../../../package.json';
import { ENVOIRMENT, LOG_LEVEL } from '../enums';
import { DEFAULT_ENV_VALUES } from './default-env-values';

export const EnvVariablesSchema: Joi.ObjectSchema = Joi.object({
  NAME: Joi.string().default(name),

  VERSION: Joi.string().default(version),

  NODE_ENV: Joi.string()
    .valid(...Object.values(ENVOIRMENT))
    .default(DEFAULT_ENV_VALUES.DEFAULT.NODE_ENV),

  LOG_LEVEL: Joi.string()
    .valid(...Object.values(LOG_LEVEL))
    .default(DEFAULT_ENV_VALUES.DEFAULT.LOG_LEVEL),

  HTTP_PORT: Joi.number().default(DEFAULT_ENV_VALUES.DEFAULT.HTTP_PORT),

  MONGODB_URI: Joi.alternatives().conditional('NODE_ENV', {
    is: ENVOIRMENT.TEST,
    then: Joi.string().default(DEFAULT_ENV_VALUES.TEST.MONGODB_URI),
    otherwise: Joi.string().default(DEFAULT_ENV_VALUES.DEFAULT.MONGODB_URI),
  }),
});
