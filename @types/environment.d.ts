declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      API_URL: string;
      API_GQL_ENDPOINT: string;
      API_CLIENT_ID: string;
      API_CLIENT_SECRET: string;
      REDIS_SESSION_NAME: string;
      REDIS_URL: string;
    }
  }
}

export { };
