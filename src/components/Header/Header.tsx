import React, { useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Button,
  createStyles,
  Group,
  Header as MantineHeader,
  Modal,
  type HeaderProps as MantineHeaderProps,
} from '@mantine/core';

import { Route } from '@/globals';

import { useTr } from '@/tools/translator';

import { useAppDispatch, useAppSelector } from '@/reduxHooks';

import HeaderLink from './HeaderLink';
import { FormProvider, useForm } from 'react-hook-form';
import LoginForm, { type LoginFormValues } from '../LoginForm';
import { doLogin } from '@/redux/reducers/session/doLogin';

const useStyles = createStyles((theme) => ({
  header: {
    marginLeft: theme.other.navbarWidth,
    display: 'flex',
    alignItems: 'center',
    padding: 0,
  },
}));

export enum Tab {
  Pokemons = 'pokemons',
  Dexes = 'dexes',
  Counters = 'counters',
}

type HeaderProps = {
  mantineHeaderProps?: MantineHeaderProps;
};

const Header = ({ mantineHeaderProps }: HeaderProps) => {
  const [loginModal, setLoginModal] = useState(false);
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { theme, classes } = useStyles();
  const dispatch = useAppDispatch();

  const loggedIn = useAppSelector((state) => state.session.loggedIn);

  const { pathname } = useRouter();

  const tr = useTr();

  const handleCloseModal = useCallback(() => {
    // if (!form.formState.isSubmitting) {
    setLoginModal(false);
    // }
  }, []);

  const onSubmit = useCallback(async (values: LoginFormValues) => {
    const res = await dispatch(doLogin({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    }));

    console.log('🚀 ~ onSubmit ~ res.meta.requestStatus', res.meta.requestStatus);
    if (res.meta.requestStatus === 'fulfilled') {
      handleCloseModal();
    }
  }, [dispatch, handleCloseModal]);

  const selectedTab = useMemo(() => {
    switch (pathname) {
      case Route.Dexes:
        return Tab.Dexes;

      case Route.Counters:
        return Tab.Counters;

      case Route.Pokemons:
      default:
        return Tab.Pokemons;
    }
  }, [pathname]);

  return (
    <MantineHeader
      {...mantineHeaderProps}
      height={theme.other.headerHeight}
      className={classes.header}
      fixed
    >
      <HeaderLink href="/pokemons" selected={selectedTab === Tab.Pokemons}>
        {tr('Pokemons')}
      </HeaderLink>
      <HeaderLink href="/dexes" selected={selectedTab === Tab.Dexes}>
        {tr('Dexes')}
      </HeaderLink>
      <HeaderLink href="/counters" selected={selectedTab === Tab.Counters}>
        {tr('Counters')}
      </HeaderLink>

      <Button onClick={() => setLoginModal(true)}>
        {tr(loggedIn ? 'Logged in' : 'Not logged in')}
      </Button>

      <Modal
        opened={loginModal}
        onClose={handleCloseModal}
        closeOnClickOutside={!form.formState.isSubmitting}
        closeOnEscape={!form.formState.isSubmitting}
        withCloseButton={!form.formState.isSubmitting}
        title="Login"
      >
        <FormProvider  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
          </form>
        </FormProvider>
      </Modal>
    </MantineHeader>
  );
};

export default Header;
