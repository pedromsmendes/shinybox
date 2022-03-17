import React from 'react';

import { TextInput } from '@mantine/core';

import { Controller, useFormContext } from 'react-hook-form';

import { useTr } from '@/tools/translator';

import { DexCreateFormValues } from './DexCreate';

const DexCreateForm = () => {
  const { control } = useFormContext<DexCreateFormValues>();

  const tr = useTr();

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
            label={tr('Name')}
            placeholder={tr('Eg: Kanto')}
          />
        )}
      />
    </>
  );
};

export default DexCreateForm;
