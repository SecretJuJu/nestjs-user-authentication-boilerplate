import * as dotenv from 'dotenv';
import getEnv from './get-enviroment';

dotenv.config();

const env = {
  DB_CONFIG: {
    DB_HOST: getEnv('DB_HOST'),
    DB_NAME: getEnv('DB_NAME'),
  },
  JWT: {
    SECRET: getEnv('JWT_SECRET'),
  },
};

export default env;
