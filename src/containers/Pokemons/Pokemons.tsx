import React from 'react';

import {
  createStyles,
  LoadingOverlay,
  Text,
} from '@mantine/core';

import { usePokemonsQuery } from '@/graphql/pokemons/Pokemons.generated';

const useStyles = createStyles(() => ({
  pokemonsContainer: {
    position: 'relative', // for the loading overlay
  },
}));

const Pokemons = () => {
  const { classes } = useStyles();

  const { data, loading } = usePokemonsQuery({
    fetchPolicy: 'cache-and-network',
  });

  return (
    <div className={classes.pokemonsContainer}>
      <LoadingOverlay visible={loading} radius="sm" />

      <Text>POKEMONS</Text>
      {data?.pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <Text>{pokemon.name}</Text>
        </div>
      ))}
    </div>
  );
};

export default Pokemons;
