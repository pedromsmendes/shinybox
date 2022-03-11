import React, { ReactNode } from 'react';

import { AppShell, createStyles } from '@mantine/core';

import Header from '../Header';
import Navbar from '../Navbar';
import Footer from '../Footer';

const useStyles = createStyles(() => ({
  layout: {
    border: '1px solid red',
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
      >
        {children}
      </AppShell>

      <Footer />
    </>
  );
};

export default Layout;
