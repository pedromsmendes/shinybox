import React from 'react';
import { type NextPage } from 'next';

import Box from '@mui/material/Box';

import { makeStyles } from '@/styles/makeStyles';

import Header from '../Header';
import Footer from '../Footer';

const useStyles = makeStyles()(() => ({
  layoutContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  componentContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 20%',
  },
}),
);

const Layout: NextPage = ({ children }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.layoutContainer)}>
      <Header />

      <Box className={cx(classes.componentContainer)}>
        {children}
      </Box>

      <Footer />
    </div>
  );
};

export default Layout;
