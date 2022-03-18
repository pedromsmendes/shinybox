import { createSlice } from '@reduxjs/toolkit';

import { doLogin } from './doLogin';
import { doLogout } from './doLogout';

const sessionSlice = createSlice({
  name: 'session',
  initialState: { loggedIn: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, { payload }) => {
      console.log('🚀 ~ builder.addCase ~ payload', payload);
      // const { remember, forcePageRefresh } = arg;
      // if (remember) {
      //   localStorage.setItem('accessToken', payload.accessToken);
      //   localStorage.setItem('accessTokenExpiracy', payload.accessTokenExpiracy);
      //   localStorage.setItem('refreshToken', payload.refreshToken);
      //   localStorage.setItem('refreshTokenExpiracy', payload.refreshTokenExpiracy);
      // }

      // sessionStorage.setItem('accessToken', payload.accessToken);
      // sessionStorage.setItem('accessTokenExpiracy', payload.accessTokenExpiracy);
      // sessionStorage.setItem('refreshToken', payload.refreshToken);
      // sessionStorage.setItem('refreshTokenExpiracy', payload.refreshTokenExpiracy);

      state.loggedIn = true;
    });
    builder.addCase(doLogin.rejected, (state) => {
      state.loggedIn = false;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.loggedIn = false;
    });
    builder.addCase(doLogout.rejected, (state) => {
      state.loggedIn = true;
    });
  },
});

export default sessionSlice.reducer;