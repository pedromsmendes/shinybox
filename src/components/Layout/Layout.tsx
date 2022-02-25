import React from 'react';
import { type NextPage } from 'next';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';

import { makeStyles } from '@/styles/makeStyles';

import Header from '../Header';
import Footer from '../Footer';

const useStyles = makeStyles()(() => ({
  'layoutContainer': {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}),
);

const Layout: NextPage = ({ children }) => {
  const router = useRouter();
  console.log('🚀 ~ router', router);

  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.layoutContainer)}>
      <Header />

      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Footer />
    </div>
  );
};

export default Layout;
