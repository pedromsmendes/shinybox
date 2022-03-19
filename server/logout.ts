import type { Request, Response, NextFunction } from 'express';

import { API_CLIENT_ID, API_CLIENT_SECRET, API_URL } from '@/globals';

import type { LogoutReturn } from './types';

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiClientId: API_CLIENT_ID,
        apiClientSecret: API_CLIENT_SECRET,
        accessToken: req.session?.tokenInfo?.accessToken,
        refreshToken: req.session?.tokenInfo?.refreshToken,
      }),
    });

    const parsedRes: LogoutReturn = await response.json();

    if (parsedRes.errors?.length) {
      return res.status(403).json(parsedRes);
    }

    if (!parsedRes.sucess) {
      return res.status(403).json(parsedRes);
    }

    delete req.session.tokenInfo;
    return res.status(200).json(parsedRes);
  } catch (ex) {
    console.trace('-- LOGOUT exception --\n', ex);

    next('Internal server error');
  }
};
export default logout;
