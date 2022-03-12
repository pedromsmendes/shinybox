import React from 'react';

import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  footer: {
    marginLeft: theme.other.navbarWidth,
    '&>div': {
      height: theme.other.footerHeight,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      '&>:not(:last-child)': {
        marginRight: theme.spacing.xs,
      },
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <div>
        <Text>2999</Text>
        <Text>Testing stuff</Text>
      </div>
    </div>
  );
};

export default Footer;
