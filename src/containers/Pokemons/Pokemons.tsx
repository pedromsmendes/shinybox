import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
  ActionIcon,
  Button,
  createStyles,
  LoadingOverlay,
} from '@mantine/core';

import { Trash as DeleteIcon } from 'tabler-icons-react';

import { usePokemonsQuery } from '@/graphql/pokemons/Pokemons.generated';
import { useRemovePokemonsMutation } from '@/graphql/pokemons/DeletePokemon.generated';

import Table from '@/components/Table';
import { PokemonOrderField, Sort } from '@/graphql/types.generated';

const useStyles = createStyles(() => ({
  pokemonsContainer: {
    position: 'relative', // for the loading overlay
    height: '100%',
    width: '100%',
    display: 'flex',
  },
}));

const Pokemons = () => {
  const [lastCursor, setLastCursor] = useState('');
  const [lastCount, setLastCount] = useState(5);

  const { classes } = useStyles();

  const { t } = useTranslation();

  const { data, loading, refetch } = usePokemonsQuery({
    variables: {
      options: {
        orderBy: [{ field: PokemonOrderField.Name, sortOrder: Sort.Asc }],
        pagination: {
          first: lastCount,
          after: lastCursor ?? undefined,
        },
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const pokemons = useMemo(() => (
    (data?.pokemons?.edges || []).map((edge) => edge.node)
  ), [data?.pokemons?.edges]);

  useEffect(() => {
    setLastCursor(pokemons[pokemons.length - 1].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons.length]);

  const [removePokemons] = useRemovePokemonsMutation();

  const handleRemovePokemons = useCallback((id: string) => async () => {
    await removePokemons({
      variables: {
        ids: [id],
      },
    });

    void refetch();
  }, [refetch, removePokemons]);

  return (
    <div className={classes.pokemonsContainer}>
      <LoadingOverlay visible={loading} radius="sm" />

      <Button onClick={() => }>next</Button>

      <Table
        headers={(
          <>
            <th>{t('general.id')}</th>
            <th>{t('general.name')}</th>
            <th align="right" />
          </>
        )}
      >
        {pokemons.map((pokemon) => (
          <tr key={pokemon.id}>
            <td>{pokemon.id}</td>
            <td>{pokemon.name}</td>
            <td align="right">
              <ActionIcon onClick={handleRemovePokemons(pokemon.id)}>
                <DeleteIcon />
              </ActionIcon>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default Pokemons;
