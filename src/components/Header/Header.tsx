import React from 'react';

import { Header as MantineHeader, HeaderProps as MantineHeaderProps, useMantineTheme } from '@mantine/core';

type HeaderProps = {
  mantineHeaderProps?: MantineHeaderProps;
};

const Header = ({ mantineHeaderProps }: HeaderProps) => {
  const theme = useMantineTheme();
  return (
    <MantineHeader {...mantineHeaderProps} height={theme.other.headerHeight} fixed>
      HEADER
    </MantineHeader>
  );
};

export default Header;
