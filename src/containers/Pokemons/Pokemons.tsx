import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

import {
  ActionIcon,
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
  const { classes } = useStyles();

  const { t } = useTranslation();

  const { data, loading, refetch } = usePokemonsQuery({
    variables: {
      options: {
        orderBy: [{ field: PokemonOrderField.Name, sortOrder: Sort.Asc }],
        pagination: {
          first: 5,
          // after: '673a2f46-a4ce-4dce-876c-0351df5b60c7',
        },
      },
    },
    fetchPolicy: 'cache-and-network',
  });

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

      <Table
        headers={(
          <>
            <th>{t('general.id')}</th>
            <th>{t('general.name')}</th>
            <th align="right" />
          </>
        )}
      >
        {data?.pokemons.edges.map(({ node: pokemon }) => (
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
