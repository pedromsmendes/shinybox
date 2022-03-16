import React, { useMemo } from 'react';

import { useRouter } from 'next/router';

import {
  createStyles,
  Header as MantineHeader,
  HeaderProps as MantineHeaderProps,
} from '@mantine/core';

import { Route } from '@/globals';

import HeaderLink from './HeaderLink';

const useStyles = createStyles((theme) => ({
  header: {
    marginLeft: theme.other.navbarWidth,
    display: 'flex',
    alignItems: 'center',
    padding: 0,
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

  const { pathname } = useRouter();

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
      <HeaderLink href="/pokemons" selected={selectedTab === Tab.Pokemons}>
        POKEMONS
      </HeaderLink>
      <HeaderLink href="/dexes" selected={selectedTab === Tab.Dexes}>
        DEXES
      </HeaderLink>
      <HeaderLink href="/counters" selected={selectedTab === Tab.Counters}>
        COUNTERS
      </HeaderLink>
    </MantineHeader>
  );
};

export default Header;
