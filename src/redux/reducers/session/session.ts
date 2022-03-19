import { createSlice } from '@reduxjs/toolkit';

import { setInLocal, setInSession } from '@/tools/storage';

import { doLogin } from './doLogin';
import { doLogout } from './doLogout';

export type LoginError = {
  code: string;
  msg: string;
};

export type LoginData = {
  accessToken: string;
  accessTokenExpiracy: string;
  refreshToken: string;
  refreshTokenExpiracy: string;
  errorDescription: string;
};

type SessionType = {
  loggedIn: boolean;
  loginErrors: LoginError[];
};

const sessionInitialState: SessionType = {
  loggedIn: false,
  loginErrors: [],
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, { payload, meta: { arg } }) => {
      const { rememberMe } = arg;
      if (rememberMe) {
        setInLocal('accessToken', payload.data.accessToken);
        setInLocal('accessTokenExpiracy', payload.data.accessTokenExpiracy);
        setInLocal('refreshToken', payload.data.refreshToken);
        setInLocal('refreshTokenExpiracy', payload.data.refreshTokenExpiracy);
      }

      setInSession('accessToken', payload.data.accessToken);
      setInSession('accessTokenExpiracy', payload.data.accessTokenExpiracy);
      setInSession('refreshToken', payload.data.refreshToken);
      setInSession('refreshTokenExpiracy', payload.data.refreshTokenExpiracy);

      state.loggedIn = true;
      state.loginErrors = [];
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      if (action.payload?.length) {
        state.loginErrors = action.payload;
      }

      state.loggedIn = false;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessTokenExpiracy');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('refreshTokenExpiracy');

      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessTokenExpiracy');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('refreshTokenExpiracy');

      state.loggedIn = false;
      state.loginErrors = [];
    });
    builder.addCase(doLogout.rejected, (state) => {
      state.loggedIn = true;
      state.loginErrors = [];
    });
  },
});

export default sessionSlice.reducer;