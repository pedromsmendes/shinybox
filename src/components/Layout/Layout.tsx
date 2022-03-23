import type { ReactNode } from 'react';
import React from 'react';

import { AppShell, createStyles, ScrollArea } from '@mantine/core';

import Header from '../Header';
import Navbar from '../Navbar';
import Footer from '../Footer';

const useStyles = createStyles((theme) => ({
  layout: {
    padding: theme.spacing.xs,
    marginLeft: theme.other.navbarWidth,
    marginTop: theme.other.headerHeight,
    width: `calc(100vh - ${theme.other.navbarWidth})`,
    height: `calc(100vh - ${theme.other.headerHeight + theme.other.footerHeight}px)`,
    flexGrow: 1,
    '&>div': {
      height: '100%',
    },
  },
  viewport: {
    '&>*': {
      height: '100%',
      width: '70%',
      minWidth: 'unset !important',
      margin: 'auto',
      display: 'flex !important',
      '&>*': {
        width: '100%',
      },
    },
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
        <ScrollArea classNames={{ viewport: classes.viewport }}>
          {children}
        </ScrollArea>
      </AppShell>

      <Footer />
    </>
  );
};

export default Layout;
