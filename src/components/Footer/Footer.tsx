import React from 'react';

import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  footer: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    '&>:not(:last-child)': {
      marginRight: theme.spacing.xs,
    },
  },
}));

const Footer = () => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.footer)}>
      <Text>2999</Text>
      <Text>Testing stuff</Text>
    </div>
  );
};

export default Footer;
