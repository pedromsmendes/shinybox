import React from 'react';
import { useTranslation } from 'react-i18next';

import { TextInput } from '@mantine/core';

import { Controller, useFormContext } from 'react-hook-form';

import type { DexCreateFormValues } from './DexCreate';

const DexCreateForm = () => {
  const { control } = useFormContext<DexCreateFormValues>();

  const { t } = useTranslation();

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
            label={t('general.name')}
            placeholder={t('form.eg-kanto', { defaultValue: 'Eg: Kanto' })}
          />
        )}
      />
    </>
  );
};

export default DexCreateForm;
