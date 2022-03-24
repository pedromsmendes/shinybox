import VariableError from '@/tools/VariableError';

const variableErrors = new VariableError();

if (!process.env.NODE_ENV) {
  variableErrors.pushMissingVariable('NODE_ENV');
}

let parsedPort = 0;
if (!process.env.PORT) {
  variableErrors.pushMissingVariable('PORT');
} else {
  parsedPort = parseInt(process.env.PORT, 10);

  if (Number.isNaN(parsedPort)) {
    variableErrors.pushWrongType('PORT');
  }
}

if (!process.env.API_URL) {
  variableErrors.pushMissingVariable('API_URL');
}

if (!process.env.API_GQL_ENDPOINT) {
  variableErrors.pushMissingVariable('API_GQL_ENDPOINT');
}

if (!process.env.API_CLIENT_ID) {
  variableErrors.pushMissingVariable('API_CLIENT_ID');
}

if (!process.env.API_CLIENT_SECRET) {
  variableErrors.pushMissingVariable('API_CLIENT_SECRET');
}

if (!process.env.SESSION_NAME) {
  variableErrors.pushMissingVariable('SESSION_NAME');
}

if (!process.env.REDIS_HOST) {
  variableErrors.pushMissingVariable('REDIS_HOST');
}

let parsedRedisPort = 0;
if (!process.env.REDIS_PORT) {
  variableErrors.pushMissingVariable('REDIS_PORT');
} else {
  parsedRedisPort = parseInt(process.env.REDIS_PORT, 10);

  if (Number.isNaN(parsedRedisPort)) {
    variableErrors.pushWrongType('REDIS_PORT');
  }
}

// only checking the variables server side, we should be fine in the browser
if (typeof window === 'undefined') {
  variableErrors.throw();
}

/* ENVIRONMENT */
export const IN_DEV = process.env.NODE_ENV === 'development';
export const IN_TEST = process.env.NODE_ENV === 'test';
export const IN_PROD = process.env.NODE_ENV === 'production';

/* SERVER */
export const PORT = parsedPort;
export const API_URL = process.env.API_URL!;
export const API_GQL_ENDPOINT = process.env.API_GQL_ENDPOINT!;
export const API_CLIENT_ID = process.env.API_CLIENT_ID!;
export const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET!;

/* SESSION AND REDIS */
export const SESSION_NAME = process.env.SESSION_NAME!;
export const REDIS_HOST = process.env.REDIS_HOST!;
export const REDIS_PORT = parsedRedisPort;

/* AUTH */
export const LOGIN_AUTH_PATH = '/auth/login';
export const REFRESH_AUTH_PATH = '/auth/refresh';
export const LOGOUT_AUTH_PATH = '/auth/logout';

export enum Route {
  Collection = '/', // HOME
  Dexes = '/dexes',
  Counters = '/counters',
  Pokemons = '/pokemons',
  Login = '/login',
  Profile = '/profile',
}