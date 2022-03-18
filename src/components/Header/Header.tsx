import React, { useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Button,
  createStyles,
  Header as MantineHeader,
  Modal,
  type HeaderProps as MantineHeaderProps,
} from '@mantine/core';

import { Route } from '@/globals';

import { useTr } from '@/tools/translator';

import { useAppSelector } from '@/reduxHooks';

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
  const [loginModal, setLoginModal] = useState(false);

  const { theme, classes } = useStyles();

  const loggedIn = useAppSelector((state) => state.session.loggedIn);

  const { pathname } = useRouter();

  const tr = useTr();

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
        {tr('Pokemons')}
      </HeaderLink>
      <HeaderLink href="/dexes" selected={selectedTab === Tab.Dexes}>
        {tr('Dexes')}
      </HeaderLink>
      <HeaderLink href="/counters" selected={selectedTab === Tab.Counters}>
        {tr('Counters')}
      </HeaderLink>

      <Button onClick={() => setLoginModal(true)}>
        {tr(loggedIn ? 'Logged in' : 'Not logged in')}
      </Button>

      <Modal
        opened={loginModal}
        onClose={() => setLoginModal(false)}
        title="Login!"
      >

      </Modal>
    </MantineHeader>
  );
};

export default Header;
