import React, { useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';

import {
  createStyles,
  Header as MantineHeader,
  type HeaderProps as MantineHeaderProps,
} from '@mantine/core';

import { Route } from '@/globals';

import { useAppDispatch, useLoggedIn } from '@/reduxHooks';
import { setUser } from '@/redux/reducers/session';

import { MeDocument, type MeQuery } from '@/graphql/users/Me.generated';

import { useTr } from '@/tools/translator';

import HeaderLink from './HeaderLink';
import UserActions from './UserActions';

const useStyles = createStyles((theme) => ({
  header: {
    marginLeft: theme.other.navbarWidth,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export enum Tab {
  Pokemons = 'pokemons',
  Dexes = 'dexes',
  Counters = 'counters',
}

type HeaderProps = {
  mantineHeaderProps?: MantineHeaderProps;
};

const Header = ({ mantineHeaderProps }: HeaderProps) => {
  const { theme, classes } = useStyles();
  const { pathname, push } = useRouter();

  const tr = useTr();

  const apolloClient = useApolloClient();
  const dispatch = useAppDispatch();
  const loggedIn = useLoggedIn();

  useEffect(() => {
    if (loggedIn) {
      void apolloClient.query<MeQuery>({
        query: MeDocument,
        fetchPolicy: 'network-only',
      })
        .then((res) => {
          if (res.data.me?.id) {
            dispatch(setUser(res.data.me));
          }
        });
    }
  }, [apolloClient, dispatch, loggedIn]);

  useEffect(() => {
    if (!loggedIn && pathname !== Route.Login) {
      void push(Route.Login);
    }
  }, [loggedIn, pathname, push]);

  const selectedTab = useMemo(() => {
    switch (pathname) {
      case Route.Dexes:
        return Tab.Dexes;

      case Route.Counters:
        return Tab.Counters;

      case Route.Pokemons:
      default:
        return Tab.Pokemons;
    }
  }, [pathname]);

  return (
    <MantineHeader
      {...mantineHeaderProps}
      height={theme.other.headerHeight}
      className={classes.header}
      fixed
    >
      <div className={classes.navigation}>
        <HeaderLink href="/pokemons" selected={selectedTab === Tab.Pokemons}>
          {tr('Pokemons')}
        </HeaderLink>
        <HeaderLink href="/dexes" selected={selectedTab === Tab.Dexes}>
          {tr('Dexes')}
        </HeaderLink>

        {loggedIn && (
          <HeaderLink href="/counters" selected={selectedTab === Tab.Counters}>
            {tr('Counters')}
          </HeaderLink>
        )}
      </div>

      <UserActions />
    </MantineHeader>
  );
};

export default Header;
