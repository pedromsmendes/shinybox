declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      API_URL: string;
      API_GQL_ENDPOINT: string;
    }
  }
}

export { };
