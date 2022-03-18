import type { Request, Response, NextFunction } from 'express';

import { API_CLIENT_ID, API_CLIENT_SECRET, API_URL } from '@/globals';

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

    const parsedRes = await response.json();

    if (parsedRes.error) {
      return res.status(403).json(parsedRes);
    }

    req.session!.tokenInfo = parsedRes.data;

    return res.status(200).json(parsedRes);
  } catch (ex) {
    console.trace('-- REFRESH exception --\n', ex);

    next('Internal server error');
  }
};
export default refresh;
