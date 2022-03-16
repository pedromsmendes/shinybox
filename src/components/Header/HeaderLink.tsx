import React from 'react';

import Link from 'next/link';

import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  headerLink: {
    height: '100%',
    padding: theme.spacing.xs,
    cursor: 'pointer',
  },
  selected: {
    borderBottom: '1px solid yellow',
  },
}));

type HeaderLinkProps = {
  href: string;
  children: string;
  selected: boolean;
};

const HeaderLink = ({ href, children, selected }: HeaderLinkProps) => {
  const { cx, classes } = useStyles();

  return (
    <Link href={href} passHref>
      <Text className={cx(classes.headerLink, { [classes.selected]: selected })}>{children}</Text>
    </Link>
  );
};

export default HeaderLink;
