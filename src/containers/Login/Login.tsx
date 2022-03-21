import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  Button,
  Group,
} from '@mantine/core';

import { Route } from '@/globals';

import { doLogin } from '@/redux/reducers/session';
import { useAppDispatch, useLoggedIn } from '@/reduxHooks';

import Form from '@/components/Form';
import LoginForm, { type LoginFormValues } from '@/components/LoginForm';

import { useTr } from '@/tools/translator';

const Login = () => {
  const tr = useTr();

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const loggedIn = useLoggedIn();

  useEffect(() => {
    if (loggedIn) {
      void push(Route.Collection);
    }
  }, [loggedIn, push]);

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = useCallback(async (values: LoginFormValues) => {
    const res = await dispatch(doLogin({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    }));

    if (res.meta.requestStatus === 'fulfilled') {
      void push(Route.Collection);
    } else {
      console.log('errors');
    }
  }, [dispatch, push]);

  return (
    <div>
      <Form {...form} onSubmit={onSubmit}>
        <LoginForm />

        <Group position="right">
          <Button
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            type="submit"
          >
            {tr('Login')}
          </Button>
        </Group>
      </Form>
    </div>
  );
};

export default Login;
