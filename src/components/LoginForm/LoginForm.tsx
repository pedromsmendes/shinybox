import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  createStyles,
  Group,
  PasswordInput,
  Switch,
  Text,
  TextInput,
  Collapse,
} from '@mantine/core';

import { useTr } from '@/tools/translator';
import { useAppSelector } from '@/reduxHooks';

const useStyles = createStyles((theme) => ({
  rememberMeGroup: {
    marginTop: theme.spacing.sm,
  },
  errorsGroup: {
    marginTop: theme.spacing.sm,
    '&>*': {
      fontWeight: 600,
      color: theme.colors.red[5],
    },
  },
}));

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm = () => {
  const loginErrors = useAppSelector((state) => state.session.loginErrors);

  const tr = useTr();

  const { control, formState } = useFormContext<LoginFormValues>();

  const { classes } = useStyles();

  const { fieldError, otherErrors } = useMemo(() => ({
    fieldError: loginErrors.find((error) => error.code === 'INVALID_USERNAME_PASSWORD'),
    otherErrors: loginErrors.filter((error) => error.code !== 'INVALID_USERNAME_PASSWORD'),
  }), [loginErrors]);

  return (
    <>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            disabled={formState.isSubmitting}
            required
            radius="lg"
            size="md"
            label={tr('E-mail')}
            placeholder={tr('Eg: mail@mail.com')}
            error={fieldError ? tr(fieldError.msg) : false}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput
            {...field}
            disabled={formState.isSubmitting}
            required
            radius="lg"
            size="md"
            label={tr('Password')}
            placeholder={tr('Eg: muchSafety123')}
            error={fieldError ? tr(fieldError.msg) : false}
          />
        )}
      />

      <Group position="left" className={classes.rememberMeGroup}>
        <Controller
          name="rememberMe"
          control={control}
          render={({ field: { value, ...field } }) => (
            <Switch
              {...field}
              disabled={formState.isSubmitting}
              checked={value}
              radius="lg"
              size="md"
              label={tr('Remember me')}
            />
          )}
        />
      </Group>

      <Collapse in={!!otherErrors.length}>
        <Group position="left" className={classes.errorsGroup}>
          {otherErrors.map((error) => (
            <Text key={error.code}>{`- ${tr(error.msg)}`}</Text>
          ))}
        </Group>
      </Collapse>
    </>
  );
};

export default LoginForm;
