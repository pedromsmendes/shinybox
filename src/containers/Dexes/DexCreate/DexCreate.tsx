import React, { useCallback } from 'react';

import { useForm } from 'react-hook-form';

import { Button, createStyles, Group } from '@mantine/core';

import { useCreateDexMutation } from '@/graphql/dexes/CreateDex.generated';

import { useTr } from '@/tools/translator';

import Form from '@/components/Form';

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
      <Form {...form} onSubmit={handleSubmit} className={classes.form}>
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
