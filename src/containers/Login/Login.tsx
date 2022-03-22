import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { useApolloClient } from '@apollo/client';

import {
  Button,
  Group,
} from '@mantine/core';

import { Route } from '@/globals';

import { MeDocument, type MeQuery } from '@/graphql/users/Me.generated';

import { doLogin, setUser } from '@/redux/reducers/session';
import { useAppDispatch, useLoggedIn } from '@/reduxHooks';

import Form from '@/components/Form';
import LoginForm, { type LoginFormValues } from '@/components/LoginForm';

import { useTr } from '@/tools/translator';

const Login = () => {
  const tr = useTr();

  const { push } = useRouter();
  const apolloClient = useApolloClient();
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

      const userRes = await apolloClient.query<MeQuery>({
        query: MeDocument,
        fetchPolicy: 'network-only',
      });

      if (userRes.data.me?.id) {
        dispatch(setUser(userRes.data.me));
      }
    } else {
      console.log('errors');
    }
  }, [apolloClient, dispatch, push]);

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
