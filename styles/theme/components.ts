import { Components } from '@mui/material';

const components: Components = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'lightgray',
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        minHeight: 'unset !important',
      },
    },
  },
};

export default components;
