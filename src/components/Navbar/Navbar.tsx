import React, { useState } from 'react';

import clsx from 'clsx';
import { Button, createStyles, Navbar as MantineNavbar, NavbarProps as MantineNavbarProps } from '@mantine/core';

const useStyles = createStyles(() => ({
  navbar: {
    width: 50,
    transition: 'width 150ms',
  },
  navbarOpen: {
    width: 300,
  },
}));

type NavbarProps = {
  mantineNavbarProps?: MantineNavbarProps;
};

const Navbar = ({ mantineNavbarProps }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();

  return (
    <MantineNavbar
      {...mantineNavbarProps}
      className={clsx(classes.navbar, open && classes.navbarOpen)}
      fixed
    >
      NAVBAR
      <Button onClick={() => setOpen(!open)}>open</Button>
    </MantineNavbar>
  );
};

export default Navbar;
