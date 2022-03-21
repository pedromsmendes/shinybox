import React, { type ReactNode } from 'react';
import { FormProvider, type UseFormReturn } from 'react-hook-form';

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

  return (
    <FormProvider {...formProps}>
      <form onSubmit={formProps.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
