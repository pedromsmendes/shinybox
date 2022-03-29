import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Group } from '@mantine/core';

import { useCreatePokemonMutation } from '@/graphql/pokemons/CreatePokemon.generated';

import PokemonCreateForm from './PokemonCreateForm';
import Form from '@/components/Form';

export type PokemonCreateFormValues = {
  name: string;
  dexes: Array<{
    dexId: string;
    name: string;
    number: string;
  }>;
};

const PokemonCreate = () => {
  const { t } = useTranslation();

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
      <Form {...form} onSubmit={handleSubmit}>
        <Group position="right">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {t('general.create')}
          </Button>
        </Group>

        <PokemonCreateForm />
      </Form>
    </div>
  );
};

export default PokemonCreate;
