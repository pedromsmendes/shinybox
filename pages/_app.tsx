import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import createEmotionCache from '@/utility/createEmotionCache';

import darkTheme from '@/styles/theme/darkTheme';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: AppProps & { emotionCache: EmotionCache }) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
