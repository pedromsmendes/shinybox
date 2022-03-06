import VariableError from '@/tools/VariableError';

const variableErrors = new VariableError();

if (!process.env.NODE_ENV) {
  variableErrors.pushMissingVariable('NODE_ENV');
}

// can't seem to check this variable with NEXT
// let parsedPort = 0;
// if (!process.env.PORT) {
//   console.log('🚀 ~ process.env', process.env);
//   console.log('arroz');
//   variableErrors.pushMissingVariable('PORT');
// } else {
//   parsedPort = parseInt(process.env.PORT, 10);

//   if (Number.isNaN(parsedPort)) {
//     variableErrors.pushWrongType('PORT');
//   }
// }

variableErrors.throw();

export const NODE_ENV = process.env.NODE_ENV!;
export const IN_DEV = NODE_ENV === 'development';
export const IN_TEST = NODE_ENV === 'test';
export const IN_PROD = NODE_ENV === 'production';
// export const PORT = parsedPort;
export const PORT = process.env.PORT;

export enum Route {
  Collection = '/', // HOME
  Dex = '/dex',
  Counters = '/counters',
  Pokemons = '/pokemons',
}