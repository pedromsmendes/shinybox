import React from 'react';

import Box from '@mui/material/Box';

import { makeStyles } from '@/styles/makeStyles';

import Text from '../Text';

const useStyles = makeStyles()((theme) => ({
  footer: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    '&>:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
}));

const Footer = () => {
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.footer)}>
      <Text>2999</Text>
      <Text>Testing stuff</Text>
    </Box>
  );
};

export default Footer;
