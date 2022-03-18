import fetch from 'node-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PORT } from '@/globals';

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