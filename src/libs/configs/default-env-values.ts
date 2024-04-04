import { ENVOIRMENT, LOG_LEVEL } from '../enums';

export const DEFAULT_ENV_VALUES = {
  DEFAULT: {
    NODE_ENV: ENVOIRMENT.DEVELOPMENT,
    HTTP_PORT: 3000,
    LOG_LEVEL: LOG_LEVEL.DEBUG,
    MONGODB_URI: 'mongodb://localhost:27017/test',
  },
  TEST: {
    PORT: 3001,
    MONGODB_URI: 'mongodb://localhost:27017/test',
  },
};
