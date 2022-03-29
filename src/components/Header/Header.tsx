import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';

import {
  createStyles,
  Header as MantineHeader,
  type HeaderProps as MantineHeaderProps,
} from '@mantine/core';

import { Route } from '@/globals';

import { useLoggedIn } from '@/reduxHooks';

import HeaderLink from './HeaderLink';
import UserActions from '../UserActions';
import LanguageSelector from '../LanguageSelector';

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
  userAndLanguage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

  const { t } = useTranslation();

  const loggedIn = useLoggedIn();

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
          {t('general.pokemons')}
        </HeaderLink>
        <HeaderLink href="/dexes" selected={selectedTab === Tab.Dexes}>
          {t('general.dexes')}
        </HeaderLink>

        {loggedIn && (
          <HeaderLink href="/counters" selected={selectedTab === Tab.Counters}>
            {t('general.counters')}
          </HeaderLink>
        )}
      </div>

      <div className={classes.userAndLanguage}>
        <LanguageSelector />
        <UserActions />
      </div>
    </MantineHeader>
  );
};

export default Header;
