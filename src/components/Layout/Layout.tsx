import React from 'react';
import { type NextPage } from 'next';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';

import { styled } from '@mui/material';

import styles from './Layout.module.css';

const LayoutContainerWithStyled = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Layout: NextPage = ({ children }) => {
  const router = useRouter();
  console.log('🚀 ~ router', router);

  return (
    <LayoutContainerWithStyled>
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box className={styles.footer}>footer</Box>
    </LayoutContainerWithStyled>
  );
};

export default Layout;
