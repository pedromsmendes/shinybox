import React from 'react';

import { TextInput } from '@mantine/core';

import { Controller, useFormContext } from 'react-hook-form';

import { PokemonCreateFormValues } from './PokemonCreate';

const PokemonCreateForm = () => {
  const { control } = useFormContext<PokemonCreateFormValues>();

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            required
            radius="lg"
            size="md"
            label="Name"
            placeholder="Eg: Bulbasaur"
          />
        )}
      />

      <Controller
        name="number"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            required
            radius="lg"
            size="md"
            label="Number"
            placeholder="Eg: 1"
          />
        )}
      />
    </>
  );
};

export default PokemonCreateForm;
