import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Input from '@/components/Input';

import { PokemonCreateInputs } from './PokemonCreate';

const PokemonCreateForm = () => {
  const { control, getValues } = useFormContext<PokemonCreateInputs>();
  console.log('getValues: ', getValues());
  console.log('getValues name: ', getValues('name'));
  console.log('getValues number: ', getValues('number'));

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <Input {...field} />}
      />


      <Controller
        name="number"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </>
  );
};

export default PokemonCreateForm;
