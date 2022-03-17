import React, { useCallback, useState } from 'react';

import clsx from 'clsx';
import {
  createStyles,
  ActionIcon,
  Navbar as MantineNavbar,
} from '@mantine/core';

import {
  Menu2 as MenuIcon,
  Plus as AddIcon,
} from 'tabler-icons-react';

import { useTr } from '@/tools/translator';

import NavbarRoute from './NavbarRoute';

const useStyles = createStyles((theme) => ({
  navbar: {
    width: theme.other.navbarWidth,
    transition: 'width 200ms ease-out',
    overflowX: 'hidden',
  },
  navbarOpen: {
    width: theme.other.navbarOpenWidth,
  },
  menuButton: {
    width: theme.other.navbarWidth,
    height: theme.other.navbarWidth,
    borderRadius: theme.other.navbarWidth / 2,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();

  const tr = useTr();

  const toggleNavbar = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return (
    <MantineNavbar
      fixed
      className={clsx(classes.navbar, open && classes.navbarOpen)}
    >
      <ActionIcon className={classes.menuButton} onClick={toggleNavbar}>
        <MenuIcon />
      </ActionIcon>

      <NavbarRoute href="/pokemons/create" icon={<AddIcon />}>
        {tr('Create pokémon')}
      </NavbarRoute>
      <NavbarRoute href="/dexes/create" icon={<AddIcon />}>
        {tr('Create dex')}
      </NavbarRoute>
      <NavbarRoute href="#" icon={<AddIcon />}>
        {tr('Create counter (not implemented)')}
      </NavbarRoute>
    </MantineNavbar>
  );
};

export default Navbar;
