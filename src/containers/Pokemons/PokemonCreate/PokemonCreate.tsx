import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, createStyles, Group } from '@mantine/core';

import { useCreatePokemonMutation } from '@/graphql/pokemons/CreatePokemon.generated';

import { useTr } from '@/tools/translator';

import PokemonCreateForm from './PokemonCreateForm';

const useStyles = createStyles((theme) => ({
  form: {
    '&>:not(:last-child)': {
      marginBottom: theme.spacing.xs,
    },
  },
}));

export type PokemonCreateFormValues = {
  name: string;
  dexes: Array<{
    dexId: string;
    name: string;
    number: string;
  }>;
};

const PokemonCreate = () => {
  const { classes } = useStyles();

  const tr = useTr();

  const form = useForm<PokemonCreateFormValues>({
    defaultValues: {
      name: '',
      dexes: [{ dexId: '', name: '', number: '' }],
    },
  });

  const [createPokemon] = useCreatePokemonMutation();

  const handleSubmit = useCallback(async (values: PokemonCreateFormValues) => {
    const res = await createPokemon({
      variables: {
        data: {
          name: values.name,
          dexes: values.dexes.map((dex) => ({
            dexId: dex.dexId,
            name: dex.name,
            number: parseInt(dex.number, 10),
          })),
        },
      },
    });
    console.log('🚀 ~ handleSubmit ~ res', res);
  }, [createPokemon]);

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
          <Group position="right">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {tr('Create')}
            </Button>
          </Group>

          <PokemonCreateForm />
        </form>
      </FormProvider>
    </div>
  );
};

export default PokemonCreate;
