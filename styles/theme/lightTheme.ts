import { createTheme } from '@mui/material/styles';

import components from './components';

import mixins from './mixins';

const lightTheme = createTheme({
  mixins,
  components,
  palette: {
    mode: 'light',
  },
});

export default lightTheme;
