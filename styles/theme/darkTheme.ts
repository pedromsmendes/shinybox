import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      dark: '#5A189A',
      main: '#7B2CBF',
      light: '#9D4EDD',
    },
    secondary: {
      dark: '#FF6D00',
      main: '#FF7900',
      light: '#FF8500',
    },
    text: {
      primary: '#0009',
      secondary: '#0002',
    },
    common: {
      inputBackground: 'lightgray',
      inputBorder: '#9984d4',
    },
  },
});

export default darkTheme;
