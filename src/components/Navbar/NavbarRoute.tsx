import React, { ReactNode } from 'react';
import Link from 'next/link';

import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  route: {
    overflow: 'hidden',
    minWidth: theme.other.navbarOpenWidth,
    maxWidth: theme.other.navbarOpenWidth,
    height: theme.other.headerHeight,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    '& :hover': {
      cursor: 'pointer',
    },
  },
  icon: {
    minWidth: theme.other.navbarWidth,
    maxWidth: theme.other.navbarWidth,
    minHeight: theme.other.headerHeight,
    maxHeight: theme.other.headerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.xs,
  },
  text: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
}));

type NavbarRouteProps = {
  href: string;
  icon: ReactNode;
  children: string;
};

const NavbarRoute = ({ href, icon, children }: NavbarRouteProps) => {
  const { classes } = useStyles();

  return (
    <Link href={href} passHref>
      <div className={classes.route}>
        <div className={classes.icon}>{icon}</div>

        <Text className={classes.text}>{children}</Text>
      </div>
    </Link>
  );
};

export default NavbarRoute;
