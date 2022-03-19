import fetch from 'node-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PORT } from '@/globals';

import type { LoginData, LoginError } from './session';

export type LoginReturn = {
  data: LoginData;
  error: LoginError[];
};

export type DoLoginArgs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const doLogin = createAsyncThunk<LoginReturn, DoLoginArgs, { rejectValue: LoginError[] }>(
  'session/doLogin',
  async (loginArgs, thunkApi) => {
    const { email, password, rememberMe } = loginArgs;

    const response = await fetch(`http://localhost:${PORT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        rememberMe,
      }),
    });

    const parsedRes = await response.json();

    if (!parsedRes.error.length) {
      return parsedRes;
    }

    return thunkApi.rejectWithValue(parsedRes.error);
  },
);