import React, { useCallback } from 'react';

import { useForm } from 'react-hook-form';

import {
  Button,
  Group,
} from '@mantine/core';

import { useCreateDexMutation } from '@/graphql/dexes/CreateDex.generated';

import { useTr } from '@/tools/translator';

import Form from '@/components/Form';

import DexCreateForm from './DexCreateForm';

export type DexCreateFormValues = {
  name: string;
};

const DexCreate = () => {
  const tr = useTr();

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
            {tr('Create')}
          </Button>
        </Group>

        <DexCreateForm />
      </Form>
    </div>
  );
};

export default DexCreate;
