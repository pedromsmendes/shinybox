import React, { useCallback } from 'react';

import {
  ActionIcon,
  createStyles,
  LoadingOverlay,
} from '@mantine/core';

import { Trash as DeleteIcon } from 'tabler-icons-react';

import { usePokemonsQuery } from '@/graphql/pokemons/Pokemons.generated';
import { useRemovePokemonsMutation } from '@/graphql/pokemons/DeletePokemon.generated';
import Table from '@/components/Table';

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

  const { data, loading, refetch } = usePokemonsQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [removePokemons] = useRemovePokemonsMutation();

  const handleRemovePokemons = useCallback((id: number) => async () => {
    await removePokemons({
      variables: {
        ids: [id],
      },
    });

    refetch();
  }, [refetch, removePokemons]);

  return (
    <div className={classes.pokemonsContainer}>
      <LoadingOverlay visible={loading} radius="sm" />

      <Table
        headers={(
          <>
            <th>ID</th>
            <th>Name</th>
            <th align="right" />
          </>
        )}
      >
        {data?.pokemons.map((pokemon) => (
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
