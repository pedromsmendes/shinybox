import { useCreatePokemonMutation } from '@/graphql/pokemons/CreatePokemon.generated';
import { Button, createStyles, Group } from '@mantine/core';
import React, { useCallback } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

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
  dexId: string;
  number: string;
};

const PokemonCreate = () => {
  const { classes } = useStyles();

  const form = useForm<PokemonCreateFormValues>({
    defaultValues: {
      name: '',
      dexId: '',
      number: '',
    },
  });

  const [createPokemon] = useCreatePokemonMutation();

  const handleSubmit = useCallback(async (values: PokemonCreateFormValues) => {
    const res = await createPokemon({
      variables: {
        data: {
          name: values.name,
          dexes: [{
            dexId: 2,
            name: values.name,
            number: 2,
          }],
        },
      },
    });
    console.log('🚀 ~ handleSubmit ~ res', res);
  }, [createPokemon]);

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
          <PokemonCreateForm />

          <Group position="right">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Create
            </Button>
          </Group>
        </form>
      </FormProvider>
    </div>
  );
};

export default PokemonCreate;