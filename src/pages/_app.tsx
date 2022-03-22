import type { AppContext, AppProps } from 'next/app';
import fetch from 'node-fetch';
import type { Request } from 'express';
import App from 'next/app';
import Head from 'next/head';

import { print } from 'graphql';
import { ApolloProvider } from '@apollo/client';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import Layout from '@/components/Layout';
import { TranslatorProvider } from '@/tools/translator';

import type { AppState } from '@/reduxTypes';
import { wrapper } from '@/redux/initStore';
import { setLoggedIn, setUser } from '@/redux/reducers/session';

import createApolloClient from '@/tools/apolloClient/createApolloClient';

import { API_GQL_ENDPOINT, API_URL } from '@/globals';

import { MeDocument } from '@/graphql/users/Me.generated';

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
        const userRes = await fetch(`${API_URL}${API_GQL_ENDPOINT}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenInfo.accessToken}`,
          },
          body: JSON.stringify({ query: print(MeDocument) }),
        });

        const parsedRes = await userRes.json();
        if (parsedRes?.data?.me) {
          store.dispatch(setUser(parsedRes.data.me));
        }
      }
    }

    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  });

export default wrapper.withRedux(MyApp);
