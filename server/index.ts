import next from 'next';
import express from 'express';
import session, { type SessionOptions } from 'express-session';
import redisConnect from 'connect-redis';
import { createClient } from 'redis';
import bodyParser from 'body-parser';

import {
  API_CLIENT_SECRET, IN_DEV, IN_TEST, LOGIN_AUTH_PATH, LOGOUT_AUTH_PATH,
  PORT, REDIS_HOST, REDIS_PORT, SESSION_NAME, REFRESH_AUTH_PATH,
} from '@/globals';
import login from './login';
import logout from './logout';
import refresh from './refresh';

import type { TokenInfo } from './types';

declare module 'express-session' {
  interface SessionData {
    tokenInfo: TokenInfo;
  }
}

const app = next({ dev: IN_DEV });
const handle = app.getRequestHandler();

const server = async () => {
  await app.prepare();

  const expressServer = express();

  const sessionOpts: SessionOptions = {
    secret: API_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    name: SESSION_NAME,
    cookie: {
      httpOnly: true,
      sameSite: true,
    },
  };

  if (!IN_TEST) {
    const RedisStore = redisConnect(session);
    const redisClient = createClient({
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
      legacyMode: true,
    });

    await redisClient.connect();

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
