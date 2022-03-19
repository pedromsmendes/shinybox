import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';

import { API_GQL_ENDPOINT, API_URL, IN_DEV } from '@/globals';

import { getFromLocal, setInLocal } from '../storage';

const createApolloClient = () => {
  const middlewareLink = setContext(async () => {
    let accessToken = getFromLocal('accessToken');
    const accessTokenExpiracy = getFromLocal('accessTokenExpiracy');
    const refreshToken = getFromLocal('refreshToken');
    const refreshTokenExpiracy = getFromLocal('refreshTokenExpiracy');

    const isAccessCloseExpirationOrExpired = (
      !accessTokenExpiracy || (Date.parse(accessTokenExpiracy) - (1 * 60 * 1000) < Date.now())
    );
    const isRefreshValid = (
      refreshTokenExpiracy && (Date.parse(refreshTokenExpiracy) - (1 * 60 * 1000) > Date.now())
    );

    if (isAccessCloseExpirationOrExpired && isRefreshValid) {
      try {
        const fetchResponse = await fetch('/auth/refresh', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ refreshToken }),
          headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        });

        const refreshResponse = await fetchResponse.json();
        console.log('🚀 ~ middlewareLink ~ refreshResponse', refreshResponse);

        if (!refreshResponse?.data) {
          throw new Error('Invalid refresh response!');
        }

        const tokenInfo = refreshResponse.data;

        setInLocal('accessToken', tokenInfo.accessToken);
        setInLocal('accessTokenExpiracy', tokenInfo.accessTokenExpiracy);
        setInLocal('refreshToken', tokenInfo.refreshToken);
        setInLocal('refreshTokenExpiracy', tokenInfo.refreshTokenExpiracy);

        accessToken = tokenInfo.accessToken;
      } catch (ex) {
        accessToken = null;
      }
    } else if (!isRefreshValid) {
      accessToken = null;
    }

    return {
      headers: {
        Authorization: (accessToken ? `Bearer ${accessToken}` : null),
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError && 'statusCode' in networkError && 'bodyText' in networkError && networkError.statusCode > 399) {
      // maybe be more solid someday
      console.log('Network error from API', networkError.bodyText); // eslint-disable-line no-console
    }

    if (graphQLErrors) {
      // eslint-disable-next-line no-console
      graphQLErrors.map(({ message, locations, path }) => console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ));
    }
  });

  const retryLink = new RetryLink({
    delay: { initial: 100, jitter: true },
    attempts: { max: 6 },
  });

  const link = retryLink.concat(errorLink.concat(middlewareLink));

  const apolloClient = new ApolloClient({
    uri: `${API_URL}${API_GQL_ENDPOINT}`,
    cache: new InMemoryCache(),
    link,
    connectToDevTools: IN_DEV,
  });

  return apolloClient;
};

export default createApolloClient;
