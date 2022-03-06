import { createMakeStyles } from 'tss-react';

// import darkTheme from './theme/darkTheme';
import lightTheme from './theme/lightTheme';

function useTheme() {
  return lightTheme;
}

export const {
  makeStyles,
  useStyles, //<- To use when you need css or cx but don't have custom classes
} = createMakeStyles({ useTheme });
