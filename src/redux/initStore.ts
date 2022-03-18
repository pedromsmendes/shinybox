import { configureStore } from '@reduxjs/toolkit';
import { IN_DEV } from '@/globals';

import reducer from './reducers';

const initStore = (preloadedState?: any) => {
  const store = configureStore({
    reducer,
    devTools: IN_DEV,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  return store;
};

export default initStore;
