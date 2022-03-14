import React, { ReactNode, useEffect, useRef } from 'react';

import clsx from 'clsx';
import {
  createStyles,
  ScrollArea,
  Table as MantineTable,
} from '@mantine/core';

import { useIntersection } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  tableContainer: {
    padding: theme.spacing.lg,
    background: 'red',
    height: '100%',
    flexGrow: 1,
  },
  table: {
  },
  headers: {
    backgroundColor: 'darkgreen',
  },
}));

type TableProps = {
  headers: ReactNode;
  children: ReactNode;
  striped?: boolean;
  highlightOnHover?: boolean;
  className?: string;
  tableClassName?: string;
};

const Table = (props: TableProps) => {
  const {
    headers,
    children,
    striped = true,
    highlightOnHover = true,
    className,
    tableClassName,
  } = props;

  const { classes } = useStyles();

  const containerRef = useRef<HTMLDivElement>(null);
  let [theadRef, observer] = useIntersection<HTMLTableSectionElement>({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (!observer?.isIntersecting) {
      console.log('not');
    }
  }, [observer?.isIntersecting]);

  return (
    <ScrollArea ref={containerRef} className={clsx(classes.tableContainer, className)}>
      <MantineTable
        striped={striped}
        highlightOnHover={highlightOnHover}
        className={clsx(classes.table, tableClassName)}
      >
        <thead ref={theadRef} className={classes.headers}>
          <tr>
            {headers}
          </tr>
        </thead>

        <tbody>
          {children}
        </tbody>
      </MantineTable>
    </ScrollArea>
  );
};

export default Table;
