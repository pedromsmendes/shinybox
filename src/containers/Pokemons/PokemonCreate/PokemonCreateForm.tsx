import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Input from '@/components/Input';

import { PokemonCreateInputs } from './PokemonCreate';
import { makeStyles } from '@/styles/makeStyles';

const useStyles = makeStyles()((theme) => ({
  pokemonCreateForm: {
    border: '1px solid red',
    '&>:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));

const PokemonCreateForm = () => {
  const { control } = useFormContext<PokemonCreateInputs>();

  const { classes } = useStyles();

  return (
    <div className={classes.pokemonCreateForm}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Name"
            inputBaseProps={{ fullWidth: true }}
          />
        )}
      />


      <Controller
        name="number"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Number"
          />
        )}
      />
    </div>
  );
};

export default PokemonCreateForm;
