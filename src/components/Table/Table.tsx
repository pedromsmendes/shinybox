import React, { ReactNode } from 'react';

import {
  createStyles,
  ScrollArea,
  Table as MantineTable,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  tableContainer: {
    width: '100%',
  },
  table: {},
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
  thumb: {
    zIndex: 1,
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

const Table = (props: TableStickyProps) => {
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
    <ScrollArea
      classNames={{
        root: cx(classes.tableContainer, className),
        thumb: classes.thumb,
      }}
    >
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

export default Table;
