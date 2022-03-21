import fetch from 'node-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PORT } from '@/globals';

import type { TokenInfo, GrantReturn } from '@/server/types';
import type { LoginError } from './session.types';

type DoLoginArgs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const doLogin = createAsyncThunk<TokenInfo | null, DoLoginArgs, { rejectValue: LoginError[] }>(
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

    const parsedRes: GrantReturn = await response.json();

    if (!parsedRes.errors.length) {
      return parsedRes.data;
    }

    return thunkApi.rejectWithValue(parsedRes.errors);
  },
);

export const doLogout = createAsyncThunk(
  'session/doLogout',
  async () => {
    await fetch(`http://localhost:${PORT}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });
  },
);