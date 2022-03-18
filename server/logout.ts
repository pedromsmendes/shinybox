import type { Request, Response, NextFunction } from 'express';

import { API_CLIENT_ID, API_CLIENT_SECRET, API_URL } from '@/globals';

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fetch(`${API_URL}/auth/logout`, {
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

    delete req.session!.tokenInfo;
    res.status(200).send();
  } catch (ex) {
    console.trace('-- LOGOUT exception --\n', ex);

    next('Internal server error');
  }
};
export default logout;
