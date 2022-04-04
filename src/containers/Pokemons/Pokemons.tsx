import React, { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
  ActionIcon,
  Button,
  createStyles,
  LoadingOverlay,
} from '@mantine/core';

import { Trash as DeleteIcon } from 'tabler-icons-react';

import { type PokemonsQuery, usePokemonsQuery } from '@/graphql/pokemons/Pokemons.generated';
import { useRemovePokemonsMutation } from '@/graphql/pokemons/DeletePokemon.generated';

import Table from '@/components/Table';
import { PokemonOrderField, Sort } from '@/graphql/types.generated';
import type { QueryNodes } from '@/tools/apolloClient/types';

const useStyles = createStyles(() => ({
  pokemonsContainer: {
    position: 'relative', // for the loading overlay
    height: '100%',
    width: '100%',
    display: 'flex',
  },
}));

const Pokemons = () => {
  const [pokemons, setPokemons] = useState<QueryNodes<PokemonsQuery>>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [cursor, setCursor] = useState('');

  const { classes } = useStyles();

  const { t } = useTranslation();

  const onPokemonsComplete = useCallback((data: PokemonsQuery) => {
    const newPokemons = data.pokemons.edges;
    if (newPokemons.length) {
      setPokemons((prevPokemons) => ([
        ...prevPokemons,
        ...newPokemons.map((edge) => edge.node),
      ]));
    }

    setTotalCount(data.pokemons.totalCount);
  }, []);

  const { loading, refetch } = usePokemonsQuery({
    variables: {
      options: {
        orderBy: [{ field: PokemonOrderField.Name, sortOrder: Sort.Asc }],
        pagination: {
          first: 4,
          after: cursor ?? undefined,
        },
      },
    },
    onCompleted: onPokemonsComplete,
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

  const handleMoreItems = useCallback(() => {
    if (totalCount > pokemons.length) {
      setCursor(pokemons[pokemons.length - 1].id);
    }
  }, [pokemons, totalCount]);

  return (
    <div className={classes.pokemonsContainer}>
      <LoadingOverlay visible={loading} radius="sm" />

      <Button onClick={handleMoreItems} disabled={!(totalCount > pokemons.length)}>next</Button>

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
