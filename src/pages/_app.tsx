import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import type { Request } from 'express';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import Layout from '@/components/Layout';
import { TranslatorProvider } from '@/tools/translator';

import type { AppState } from '@/reduxTypes';
import { wrapper } from '@/redux/initStore';
import { setLoggedIn } from '@/redux/reducers/session';

import createApolloClient from '@/tools/apolloClient/createApolloClient';

const MyApp = (props: AppProps & { initialState: AppState }) => {
  const { Component, pageProps } = props;

  const apolloClient = createApolloClient();

  return (
    <>
      <Head>
        <title>SHINY</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

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
            <NotificationsProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </TranslatorProvider>
        </MantineProvider>
      </ApolloProvider>
    </>
  );
};

MyApp.getInitialProps = wrapper
  .getInitialAppProps((store) => async (appContext: AppContext) => {
    // If we are at the server, check if we have a session, if we do, set logged in
    // and set the tokens in the state so that we can later set them in the client
    const session = (appContext.ctx?.req as Request)?.session;
    if (session) {
      const { tokenInfo } = session!;

      if (tokenInfo?.accessToken) {
        store.dispatch(setLoggedIn());

        // maybe query the user and save it in redux
      }
    }

    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  });

export default wrapper.withRedux(MyApp);
