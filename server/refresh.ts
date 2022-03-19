import fetch from 'node-fetch';
import type { Request, Response, NextFunction } from 'express';

import { API_CLIENT_ID, API_CLIENT_SECRET, API_URL } from '@/globals';

import type { GrantReturn } from './types';

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await fetch(`${API_URL}/auth/grant`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grantType: 'refresh_token',
        apiClientId: API_CLIENT_ID,
        apiClientSecret: API_CLIENT_SECRET,
        refreshToken: req.body.refreshToken,
      }),
    });

    const parsedRes: GrantReturn = await response.json();

    if (parsedRes.errors?.length) {
      return res.status(403).json(parsedRes);
    }

    if (parsedRes.data) {
      req.session.tokenInfo = parsedRes.data;
    }

    return res.status(200).json(parsedRes);
  } catch (ex) {
    console.trace('-- REFRESH exception --\n', ex);

    next('Internal server error');
  }
};
export default refresh;
