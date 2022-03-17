import React, { useCallback } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Button, createStyles, Group } from '@mantine/core';

import { useCreateDexMutation } from '@/graphql/dexes/CreateDex.generated';

import { useTr } from '@/tools/translator';

import DexCreateForm from './DexCreateForm';

const useStyles = createStyles((theme) => ({
  form: {
    '&>:not(:last-child)': {
      marginBottom: theme.spacing.xs,
    },
  },
}));

export type DexCreateFormValues = {
  name: string;
};

const DexCreate = () => {
  const { classes } = useStyles();

  const tr = useTr();

  const form = useForm<DexCreateFormValues>({
    defaultValues: {
      name: '',
    },
  });

  const [createDex] = useCreateDexMutation();

  const handleSubmit = useCallback(async (values: DexCreateFormValues) => {
    const res = await createDex({
      variables: {
        data: {
          name: values.name,
        },
      },
    });
    console.log('🚀 ~ handleSubmit ~ res', res);
  }, [createDex]);

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
          <DexCreateForm />

          <Group position="right">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {tr('Create')}
            </Button>
          </Group>
        </form>
      </FormProvider>
    </div>
  );
};

export default DexCreate;
