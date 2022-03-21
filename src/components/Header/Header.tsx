import React, { useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import {
  createStyles,
  Divider,
  Header as MantineHeader,
  Menu,
  type HeaderProps as MantineHeaderProps,
} from '@mantine/core';

import { User as UserIcon } from 'tabler-icons-react';

import { Route } from '@/globals';

import { useLoggedIn } from '@/reduxHooks';

import { useTr } from '@/tools/translator';

import HeaderLink from './HeaderLink';
import ActionsMenu from '../ActionsMenu';

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

  const loggedIn = useLoggedIn();

  useEffect(() => {
    if (loggedIn) {
      void push(Route.Login);
    }
  }, [loggedIn, push]);

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
        <HeaderLink href="/counters" selected={selectedTab === Tab.Counters}>
          {tr('Counters')}
        </HeaderLink>
      </div>

      <ActionsMenu buttonContent={<UserIcon />}>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<UserIcon />}>Settings</Menu.Item>
        <Menu.Item>Messages</Menu.Item>
        <Menu.Item>Gallery</Menu.Item>

        <Divider />

        <Menu.Label>Danger zone</Menu.Label>
      </ActionsMenu>
    </MantineHeader>
  );
};

export default Header;
