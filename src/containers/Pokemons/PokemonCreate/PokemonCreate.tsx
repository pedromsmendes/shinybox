import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Layout from '@/components/Layout';
import Button from '@/components/Button/Button';

// import { useCreatePokemonMutation } from '@/graphql/pokemons/CreatePokemon.generated';
import PokemonCreateForm from './PokemonCreateForm';

export type PokemonCreateInputs = {
  number: number;
  name: string;
};

const PokemonCreate = () => {
  // const [createPokemon] = useCreatePokemonMutation();
  const form = useForm<PokemonCreateInputs>();

  // const handleCreateClick = useCallback(async () => {
  //   const parsedNumber = parseInt(number, 10);

  //   if (name && !Number.isNaN(parsedNumber)) {
  //     await createPokemon({
  //       variables: {
  //         data: {
  //           name,
  //           dexes: [{ dexId: 1, name, number: parsedNumber }],
  //         },
  //       },
  //       fetchPolicy: 'network-only',
  //     });
  //   }
  // }, [createPokemon, name, number]);

  const onSubmit = (data: any) => console.log(data);

  return (
    <Layout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PokemonCreateForm />
        </form>
      </FormProvider>

      <Button>
        Create
      </Button>
    </Layout>
  );
};

export default PokemonCreate;
