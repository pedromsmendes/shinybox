import React, { useCallback, useState } from 'react';

import clsx from 'clsx';
import {
  createStyles,
  ActionIcon,
  Navbar as MantineNavbar,
} from '@mantine/core';

import { Menu2 as MenuIcon } from 'tabler-icons-react';

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

  const toggleNavbar = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return (
    <MantineNavbar
      className={clsx(classes.navbar, open && classes.navbarOpen)}
      fixed
    >
      <ActionIcon className={classes.menuButton} onClick={toggleNavbar}>
        <MenuIcon />
      </ActionIcon>
    </MantineNavbar>
  );
};

export default Navbar;
