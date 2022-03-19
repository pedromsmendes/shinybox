import fetch from 'node-fetch';
import type { Request, Response, NextFunction } from 'express';

import { API_CLIENT_ID, API_CLIENT_SECRET, API_URL } from '@/globals';

import type { GrantReturn } from './types';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await fetch(`${API_URL}/auth/grant`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grantType: 'password',
        apiClientId: API_CLIENT_ID,
        apiClientSecret: API_CLIENT_SECRET,
        email: req.body.email,
        password: req.body.password,
      }),
    });

    const parsedRes: GrantReturn = await response.json();

    if (parsedRes.errors?.length) {
      return res.status(403).json(parsedRes);
    }

    if (parsedRes.data) {
      req.session.tokenInfo = parsedRes.data;

      if (req.body.rememberMe) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
      }
    }

    return res.status(200).json(parsedRes);
  } catch (ex) {
    console.trace('-- LOGIN exception --\n', ex);

    next('Internal server error');
    return;
  }
};

export default login;
