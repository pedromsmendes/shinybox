import React, { useCallback, useMemo } from 'react';

import {
  TextInput,
  Select,
} from '@mantine/core';

import { Controller, useFormContext } from 'react-hook-form';

import { PokemonCreateFormValues } from './PokemonCreate';
import { useDexesQuery } from '@/graphql/dexes/Dexes.generated';
import { useCreateDexMutation } from '@/graphql/dexes/CreateDex.generated';

const PokemonCreateForm = () => {
  const { control, setValue } = useFormContext<PokemonCreateFormValues>();

  const { data, loading: loadingDexes, refetch } = useDexesQuery();
  const [createDex, { loading: creatingDex }] = useCreateDexMutation();

  const onDexCreate = useCallback(async (dexName: string) => {
    const res = await createDex({
      variables: {
        data: {
          name: dexName,
        },
      },
    });

    const createdDex = res.data?.createDex;
    if (createdDex) {
      await refetch();

      setValue('dexId', `${createdDex.id}`);
    }
  }, [createDex, refetch, setValue]);

  const dexes = useMemo(() => (
    data?.dexes || []
  ), [data?.dexes]);

  const dexesSelect = useMemo(() => (
    dexes.map((dex) => ({
      value: `${dex.id}`,
      label: dex.name,
    }))
  ), [dexes]);

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
        name="dexId"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            required
            searchable
            creatable
            disabled={creatingDex || loadingDexes}
            radius="lg"
            size="md"
            label="Dex"
            placeholder="Eg: Kanto"
            getCreateLabel={(query: string) => `Add "${query}"`}
            onCreate={onDexCreate}
            data={dexesSelect}
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
