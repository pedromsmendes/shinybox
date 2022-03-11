import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { MantineProvider } from '@mantine/core';

import { API_GQL_ENDPOINT, API_URL, IN_DEV } from '@/globals';
import Layout from '@/components/Layout';

const MyApp = (props: AppProps) => {
  const {
    Component,
    pageProps,
  } = props;

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

      <ApolloProvider client={apolloClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
            other: {
              headerHeight: 50,
            },
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
