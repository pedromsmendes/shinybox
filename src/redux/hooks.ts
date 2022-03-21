import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { Store } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from './types';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppStore = (): Store<RootState> => useStore<RootState>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLoginErrors = () => useAppSelector((state) => state.session.loginErrors);
export const useLoggedIn = () => useAppSelector((state) => state.session.loggedIn);