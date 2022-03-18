import React, { useCallback } from 'react';

import {
  ActionIcon,
  createStyles,
  LoadingOverlay,
} from '@mantine/core';

import { Trash as DeleteIcon } from 'tabler-icons-react';

import { useDexesQuery } from '@/graphql/dexes/Dexes.generated';
import { useRemoveDexesMutation } from '@/graphql/dexes/DeleteDex.generated';

import Table from '@/components/Table';

import { useTr } from '@/tools/translator';

const useStyles = createStyles(() => ({
  dexesContainer: {
    position: 'relative', // for the loading overlay
    height: '100%',
    width: '100%',
    display: 'flex',
  },
}));

const Dexes = () => {
  const { classes } = useStyles();

  const tr = useTr();

  const { data, loading, refetch } = useDexesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [removeDexes] = useRemoveDexesMutation();

  const handleRemoveDexes = useCallback((id: string) => async () => {
    await removeDexes({
      variables: {
        ids: [id],
      },
    });

    void refetch();
  }, [refetch, removeDexes]);

  return (
    <div className={classes.dexesContainer}>
      <LoadingOverlay visible={loading} radius="sm" />

      <Table
        headers={(
          <>
            <th>{tr('ID')}</th>
            <th>{tr('Name')}</th>
            <th align="right" />
          </>
        )}
      >
        {data?.dexes.map((dex) => (
          <tr key={dex.id}>
            <td>{dex.id}</td>
            <td>{dex.name}</td>
            <td align="right">
              <ActionIcon onClick={handleRemoveDexes(dex.id)}>
                <DeleteIcon />
              </ActionIcon>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default Dexes;
