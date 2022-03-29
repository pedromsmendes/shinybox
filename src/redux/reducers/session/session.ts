import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { removeFromLocal, removeFromSession, setInLocal, setInSession } from '@/tools/storage';

import type { AppState } from '@/reduxTypes';

import { doLogin, doLogout } from './extraReducers';
import { type SessionType, type SessionUser } from './session.types';

const hydrate = createAction<AppState>(HYDRATE);

export const sessionInitialState: SessionType = {
  loggedIn: false,
  loginErrors: [],
  user: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,
  reducers: {
    setLoggedIn: (state) => {
      state.loggedIn = true;
    },
    setUser: (state, action: PayloadAction<SessionUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload[sessionSlice.name],
      };
    });
    builder.addCase(doLogin.fulfilled, (state, { payload, meta: { arg } }) => {
      const { rememberMe } = arg;
      if (payload) {
        if (rememberMe) {
          setInLocal('accessToken', payload.accessToken);
          setInLocal('accessTokenExpiracy', payload.accessTokenExpiracy);
          setInLocal('refreshToken', payload.refreshToken);
          setInLocal('refreshTokenExpiracy', payload.refreshTokenExpiracy);
        }

        setInSession('accessToken', payload.accessToken);
        setInSession('accessTokenExpiracy', payload.accessTokenExpiracy);
        setInSession('refreshToken', payload.refreshToken);
        setInSession('refreshTokenExpiracy', payload.refreshTokenExpiracy);

        state.loggedIn = true;
        state.loginErrors = [];
      }
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      if (action.payload?.length) {
        state.loginErrors = action.payload;
      }

      state.loggedIn = false;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      removeFromLocal('accessToken');
      removeFromLocal('accessTokenExpiracy');
      removeFromLocal('refreshToken');
      removeFromLocal('refreshTokenExpiracy');

      removeFromSession('accessToken');
      removeFromSession('accessTokenExpiracy');
      removeFromSession('refreshToken');
      removeFromSession('refreshTokenExpiracy');

      state.loggedIn = false;
      state.loginErrors = [];
      state.user = null;
    });
    builder.addCase(doLogout.rejected, (state) => {
      state.loggedIn = true;
      state.loginErrors = [];
    });
  },
});

export const {
  setLoggedIn,
  setUser,
} = sessionSlice.actions;

export * from './extraReducers';

export default sessionSlice;