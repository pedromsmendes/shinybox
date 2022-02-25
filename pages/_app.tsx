import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { TssCacheProvider } from 'tss-react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import darkTheme from '@/styles/theme/darkTheme';
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
    <CacheProvider value={emotionCache}>
      <TssCacheProvider value={tssReactCache}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </TssCacheProvider>
    </CacheProvider>
  );
};

export default MyApp;
