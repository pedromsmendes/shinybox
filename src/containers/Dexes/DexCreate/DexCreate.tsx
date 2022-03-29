import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from 'react-hook-form';

import {
  Button,
  Group,
} from '@mantine/core';

import { useCreateDexMutation } from '@/graphql/dexes/CreateDex.generated';

import Form from '@/components/Form';

import DexCreateForm from './DexCreateForm';

export type DexCreateFormValues = {
  name: string;
};

const DexCreate = () => {
  const { t } = useTranslation();

  const form = useForm<DexCreateFormValues>({
    defaultValues: {
      name: '',
    },
  });

  const [createDex] = useCreateDexMutation();

  const handleSubmit = useCallback(async (values: DexCreateFormValues) => {
    await createDex({
      variables: {
        data: {
          name: values.name,
        },
      },
    });
  }, [createDex]);

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

        <DexCreateForm />
      </Form>
    </div>
  );
};

export default DexCreate;
