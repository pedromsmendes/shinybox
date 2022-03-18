import fetch from 'node-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PORT } from '@/globals';

type DoLoginReturn = {
  accessToken: string;
  accessTokenExpiracy: string;
  refreshToken: string;
  refreshTokenExpiracy: string;
  errorDescription: string;
};

export type DoLoginArgs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const doLogin = createAsyncThunk<DoLoginReturn, DoLoginArgs, { rejectValue: string }>(
  'session/doLogin',
  async ({ email, password, rememberMe }, thunkApi) => {
    const response = await fetch(`http://localhost:${PORT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        rememberMe,
      }),
    });

    const parsedRes = await response.json();
    console.log('🚀 ~ parsedRes', parsedRes);

    if (!parsedRes.error) {
      return parsedRes;
    }

    return thunkApi.rejectWithValue(parsedRes.errorDescription);
  },
);