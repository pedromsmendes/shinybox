import React from 'react';

import { createStyles, Text } from '@mantine/core';

import { useTr } from '@/tools/translator';

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

  const tr = useTr();

  return (
    <div className={classes.footer}>
      <div>
        <Text>{tr('9999')}</Text>
        <Text>{tr('Testing stuff')}</Text>
      </div>
    </div>
  );
};

export default Footer;
