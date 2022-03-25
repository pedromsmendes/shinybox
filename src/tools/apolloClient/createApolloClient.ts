import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

import { API_GQL_ENDPOINT, API_URL, IN_DEV } from '@/globals';

import { getFromLocal, removeFromLocal, setInLocal } from '../storage';

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

        removeFromLocal('accessToken');
        removeFromLocal('accessTokenExpiracy');
        removeFromLocal('refreshToken');
        removeFromLocal('refreshTokenExpiracy');
      }
    } else if (!isRefreshValid) {
      accessToken = null;

      removeFromLocal('accessToken');
      removeFromLocal('accessTokenExpiracy');
      removeFromLocal('refreshToken');
      removeFromLocal('refreshTokenExpiracy');
    }

    return {
      headers: {
        Authorization: (accessToken ? `Bearer ${accessToken}` : null),
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError && 'statusCode' in networkError && 'bodyText' in networkError && networkError.statusCode > 399) {
      console.error('Network error from API', networkError.bodyText);
    }

    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => (
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      ));
    }
  });

  const retryLink = new RetryLink({
    delay: { initial: 100, jitter: true },
    attempts: { max: 6 },
  });

  const uploadLink = createUploadLink({ uri: `${API_URL}${API_GQL_ENDPOINT}` });

  const link = retryLink.concat(
    errorLink.concat(
      middlewareLink.concat(
        uploadLink,
      ),
    ),
  );

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: IN_DEV,
    link,
  });

  return apolloClient;
};

export default createApolloClient;
