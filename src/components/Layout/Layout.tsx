import React, { ReactNode } from 'react';

import { AppShell, createStyles } from '@mantine/core';

import Header from '../Header';
import Navbar from '../Navbar';
import Footer from '../Footer';

const useStyles = createStyles((theme) => ({
  layout: {
    padding: 0,
    marginLeft: theme.other.navbarWidth,
    marginTop: theme.other.headerHeight,
    width: `calc(100vh - ${theme.other.navbarWidth})`,
    height: `calc(100vh - ${theme.other.headerHeight + theme.other.footerHeight}px)`,
    flexGrow: 1,
  },
}));

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { classes } = useStyles();

  return (
    <>
      <AppShell
        header={<Header />}
        navbar={<Navbar />}
        classNames={{ main: classes.layout }}
      >
        {children}
      </AppShell>

      <Footer />
    </>
  );
};

export default Layout;
