// import VariableError from '@/tools/VariableError';

// const variableErrors = new VariableError();

// if (!process.env.NODE_ENV) {
//   variableErrors.pushMissingVariable('NODE_ENV');
// }

// console.log('🚀 ~ process.env.API_URL', process.env.API_URL);
// if (!process.env.API_URL) {
//   variableErrors.pushMissingVariable('API_URL');
// }

// console.log('🚀 ~ process.env.API_GQL_ENDPOINT', process.env.API_GQL_ENDPOINT);
// if (!process.env.API_GQL_ENDPOINT) {
//   variableErrors.pushMissingVariable('API_GQL_ENDPOINT');
// }

// variableErrors.throw();

export const IN_DEV = process.env.NODE_ENV === 'development';
export const IN_TEST = process.env.NODE_ENV === 'test';
export const IN_PROD = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT;
export const API_URL = process.env.API_URL;
export const API_GQL_ENDPOINT = process.env.API_GQL_ENDPOINT;
export const API_CLIENT_ID = process.env.API_CLIENT_ID;
export const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET!;

/* AUTH */
export const LOGIN_AUTH_PATH = '/auth/login';
export const REFRESH_AUTH_PATH = '/auth/refresh';
export const LOGOUT_AUTH_PATH = '/auth/logout';

export const REDIS_SESSION_NAME = process.env.REDIS_SESSION_NAME!;
export const REDIS_URL = process.env.REDIS_URL!;

export enum Route {
  Collection = '/', // HOME
  Dexes = '/dexes',
  Counters = '/counters',
  Pokemons = '/pokemons',
  Login = '/login',
  Profile = '/profile',
}