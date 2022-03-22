import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { Store } from '@reduxjs/toolkit';

import type { AppDispatch, AppState } from './types';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppStore = (): Store<AppState> => useStore<AppState>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useLoginErrors = () => useAppSelector((state) => state.session.loginErrors);
export const useLoggedIn = () => useAppSelector((state) => state.session.loggedIn);
export const useUser = () => useAppSelector((state) => state.session.user);