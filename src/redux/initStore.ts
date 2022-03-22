import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { IN_DEV } from '@/globals';

import reducer from './reducers';

import type { AppStore } from './types';

const initStore = () => configureStore({
  reducer,
  devTools: IN_DEV,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const wrapper = createWrapper<AppStore>(initStore);

export default initStore;
