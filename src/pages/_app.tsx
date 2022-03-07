import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { TssCacheProvider } from 'tss-react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import lightTheme from '@/styles/theme/lightTheme';
import createEmotionCache from '@/styles/createEmotionCache';
import createTssReactCache from '@/styles/createTssReactCache';
import { API_GQL_ENDPOINT, API_URL, IN_DEV } from '@/globals';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: AppProps & { emotionCache: EmotionCache }) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    // apolloClient,
    pageProps,
  } = props;

  const tssReactCache = createTssReactCache();

  const apolloClient = new ApolloClient({
    uri: `${API_URL}${API_GQL_ENDPOINT}`,
    cache: new InMemoryCache(),
    connectToDevTools: IN_DEV,
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <CacheProvider value={emotionCache}>
          <TssCacheProvider value={tssReactCache}>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </TssCacheProvider>
        </CacheProvider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
