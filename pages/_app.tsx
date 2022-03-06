import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { TssCacheProvider } from 'tss-react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import lightTheme from '@/styles/theme/lightTheme';
import createEmotionCache from '@/styles/createEmotionCache';
import createTssReactCache from '@/styles/createTssReactCache';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: AppProps & { emotionCache: EmotionCache }) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;

  const tssReactCache = createTssReactCache();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <CacheProvider value={emotionCache}>
        <TssCacheProvider value={tssReactCache}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </TssCacheProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
