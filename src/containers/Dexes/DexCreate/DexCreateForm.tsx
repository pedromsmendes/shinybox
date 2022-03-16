import React from 'react';

import { TextInput } from '@mantine/core';

import { Controller, useFormContext } from 'react-hook-form';

import { DexCreateFormValues } from './DexCreate';

const DexCreateForm = () => {
  const { control } = useFormContext<DexCreateFormValues>();

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
            placeholder="Eg: Kanto"
          />
        )}
      />
    </>
  );
};

export default DexCreateForm;
