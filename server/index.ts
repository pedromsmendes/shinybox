import next from 'next';
import express from 'express';
import session, { type SessionOptions } from 'express-session';
import redisConnect from 'connect-redis';
import { createClient } from 'redis';
import bodyParser from 'body-parser';

import { API_CLIENT_SECRET, IN_DEV, IN_PROD, LOGIN_AUTH_PATH, LOGOUT_AUTH_PATH, PORT, REDIS_SESSION_NAME, REDIS_URL, REFRESH_AUTH_PATH } from '@/globals';
import login from './login';
import logout from './logout';
import refresh from './refresh';

import type { SessionTokenInfo } from './types/SessionToken';

declare module 'express-session' {
  interface SessionData {
    tokenInfo: SessionTokenInfo;
  }
}

const app = next({ dev: IN_DEV });
const handle = app.getRequestHandler();

const server = async () => {
  await app.prepare();

  const expressServer = express();

  // https://www.npmjs.com/package/express-session
  const sessionOpts: SessionOptions = {
    secret: API_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    name: REDIS_SESSION_NAME,
    cookie: {
      httpOnly: true,
      sameSite: true,
    },
  };

  if (IN_PROD) {
    const RedisStore = redisConnect(session);
    const redisClient = createClient({
      url: REDIS_URL,
    });

    sessionOpts.store = new RedisStore({ client: redisClient });
  }

  expressServer.use(session(sessionOpts));

  // Parse json requests
  expressServer.use(express.json());

  // Handle authentication
  /* eslint-disable @typescript-eslint/no-misused-promises */
  expressServer.post(LOGIN_AUTH_PATH, bodyParser.json(), login);
  expressServer.post(LOGOUT_AUTH_PATH, bodyParser.json(), logout);
  expressServer.post(REFRESH_AUTH_PATH, bodyParser.json(), refresh);
  /* eslint-enable @typescript-eslint/no-misused-promises */

  // Send all other paths to nextjs
  expressServer.get('*', (req, res) => { void handle(req, res); });

  expressServer.listen(PORT, () => console.info(`> Ready on http://localhost:${PORT}`));

};

export default server();
