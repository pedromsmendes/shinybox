import { createStyles } from '@mantine/core';
import React, { type ReactNode } from 'react';
import { FormProvider, type UseFormReturn } from 'react-hook-form';

const useStyles = createStyles((theme) => ({
  form: {
    '&>*': {
      marginBottom: theme.spacing.xs,
    },
  },
}));

type FormProps = UseFormReturn<any> & {
  className?: string;
  onSubmit: (values: any) => void;
  children: ReactNode;
};

const Form = (props: FormProps) => {
  const {
    className,
    onSubmit,
    children,
    ...formProps
  } = props;

  const { cx, classes } = useStyles();

  return (
    <FormProvider {...formProps}>
      <form onSubmit={formProps.handleSubmit(onSubmit)} className={cx(classes.form, className)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
