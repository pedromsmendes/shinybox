import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import type { Request } from 'express';

import { MantineProvider } from '@mantine/core';

import Layout from '@/components/Layout';
import { TranslatorProvider } from '@/tools/translator';

import type { RootState } from '@/reduxTypes';
import initStore from '@/redux/initStore';

import createApolloClient from '@/tools/apolloClient/createApolloClient';

const MyApp = (props: AppProps & { initialState: RootState }) => {
  const {
    Component,
    initialState,
    pageProps,
  } = props;

  const store = initStore(initialState);

  const apolloClient = createApolloClient();

  return (
    <>
      <Head>
        <title>SHINY</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'dark',
              other: {
                headerHeight: 50,
                navbarWidth: 50,
                navbarOpenWidth: 300,
                footerHeight: 30,
              },
            }}
          >
            <TranslatorProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </TranslatorProvider>
          </MantineProvider>
        </ApolloProvider>
      </Provider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  // Default state for our app context
  const initialState = { session: { loggedIn: false } };

  // If we are at the server, check if we have a session, if we do, set logged in
  // and set the tokens in the state so that we can later set them in the client
  const session = (appContext.ctx?.req as Request).session;
  if (appContext.ctx.req && session) {
    const { tokenInfo } = session!;

    if (tokenInfo?.accessToken) {
      initialState.session.loggedIn = true;
    }
  }

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, initialState, tokenInfo: true };
};

export default MyApp;
