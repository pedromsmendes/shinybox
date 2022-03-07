import React, { useCallback, useState } from 'react';

import ButtonBase from '@mui/material/ButtonBase';

import Layout from '@/components/Layout';
import Input from '@/components/Input';

import { useCreatePokemonMutation } from '@/graphql/pokemons/CreatePokemon.generated';

const CreatePokemon = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [createPokemon] = useCreatePokemonMutation();

  const nameChange = useCallback((_, newValue) => {
    setName(newValue);
  }, []);

  const numberChange = useCallback((_, newValue) => {
    setNumber(newValue);
  }, []);

  const handleCreateClick = useCallback(async () => {
    const parsedNumber = parseInt(number, 10);

    if (name && !Number.isNaN(parsedNumber)) {
      await createPokemon({
        variables: {
          data: {
            name,
            dexes: [{ dexId: 1, name, number: parsedNumber }],
          },
        },
        fetchPolicy: 'network-only',
      });
    }
  }, [createPokemon, name, number]);

  return (
    <Layout>
      <ButtonBase onClick={handleCreateClick}>
        Create
      </ButtonBase>

      <Input
        value={name}
        placeholder="Name"
        onChange={nameChange}
      />

      <Input
        value={number}
        placeholder="Number"
        onChange={numberChange}
      />
    </Layout>
  );
};

export default CreatePokemon;
