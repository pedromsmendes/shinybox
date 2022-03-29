import React from 'react';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  return (
    <div className={classes.footer}>
      <div>
        <Text>{t('footer.placeholder')}</Text>
      </div>
    </div>
  );
};

export default Footer;
