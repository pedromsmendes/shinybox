import React from 'react';

import {
  createStyles,
  Header as MantineHeader,
  HeaderProps as MantineHeaderProps,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    marginLeft: theme.other.navbarWidth,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.xs,
  },
}));

type HeaderProps = {
  mantineHeaderProps?: MantineHeaderProps;
};

const Header = ({ mantineHeaderProps }: HeaderProps) => {
  const { theme, classes } = useStyles();

  return (
    <MantineHeader
      {...mantineHeaderProps}
      height={theme.other.headerHeight}
      className={classes.header}
      fixed
    >
      HEADER
    </MantineHeader>
  );
};

export default Header;
