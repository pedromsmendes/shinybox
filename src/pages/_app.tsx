import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { MantineProvider } from '@mantine/core';

import Layout from '@/components/Layout';
import { TranslatorProvider } from '@/tools/translator';

import initStore from '@/redux/initStore';

import { API_GQL_ENDPOINT, API_URL, IN_DEV } from '@/globals';

const MyApp = (props: AppProps) => {
  const {
    Component,
    pageProps,
  } = props;

  const store = initStore();

  const apolloClient = new ApolloClient({
    uri: `${API_URL}${API_GQL_ENDPOINT}`,
    cache: new InMemoryCache(),
    connectToDevTools: IN_DEV,
  });

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

export default MyApp;
