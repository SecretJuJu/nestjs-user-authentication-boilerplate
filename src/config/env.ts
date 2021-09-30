import * as dotenv from 'dotenv';
import getEnv from './get-enviroment';

dotenv.config();

const env = {
  DB_HOST: getEnv('DB_HOST'),
  DB_NAME: getEnv('DB_NAME'),
};

export default env;
