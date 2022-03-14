import React, { ReactNode } from 'react';

import {
  createStyles,
  ScrollArea,
  Table as MantineTable,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  table: {
    minWidth: 300,
  },
  header: {
    zIndex: 1,
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]}`,
    },
  },
}));

type TableStickyProps = {
  headers: ReactNode;
  children: ReactNode;
  striped?: boolean;
  highlightOnHover?: boolean;
  className?: string;
  tableClassName?: string;
};

const TableSticky = (props: TableStickyProps) => {
  const {
    headers,
    children: rows,
    striped = true,
    highlightOnHover = true,
    className,
    tableClassName,
  } = props;

  const { cx, classes } = useStyles();

  return (
    <ScrollArea className={cx(className)}>
      <MantineTable
        striped={striped}
        highlightOnHover={highlightOnHover}
        className={cx(classes.table, tableClassName)}
      >
        <thead className={cx(classes.header)}>
          <tr>{headers}</tr>
        </thead>

        <tbody>{rows}</tbody>
      </MantineTable>
    </ScrollArea>
  );
};

export default TableSticky;
