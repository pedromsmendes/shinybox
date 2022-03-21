import { createSlice } from '@reduxjs/toolkit';

import { removeFromLocal, removeFromSession, setInLocal, setInSession } from '@/tools/storage';

import { doLogin, doLogout } from './extraReducers';
import type { SessionType } from './session.types';

export const sessionInitialState: SessionType = {
  loggedIn: false,
  loginErrors: [],
  user: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,
  reducers: {},
  extraReducers: (builder) => {
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
    });
    builder.addCase(doLogout.rejected, (state) => {
      state.loggedIn = true;
      state.loginErrors = [];
    });
  },
});

export * from './extraReducers';

export default sessionSlice.reducer;