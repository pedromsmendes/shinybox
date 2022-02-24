import React from 'react';
import { type NextPage } from 'next';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';

import { styled } from '@mui/material';

const LayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid red',
  width: '100%',
  height: '100%',
});

const ComponentContainer = styled('div')({
  flexGrow: 1,
  backgroundColor: 'gray',
  border: '1px solid blue',
});

const Layout: NextPage = ({ children }) => {
  const router = useRouter();
  console.log('🚀 ~ router', router);

  return (
    <LayoutContainer>
      <ComponentContainer>
        {children}
      </ComponentContainer>

      <Box>footer</Box>
    </LayoutContainer>
  );
};

export default Layout;
