import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Button,
  createStyles,
  Divider,
  Menu,
} from '@mantine/core';
import {
  User as UserIcon,
  Pencil as EditIcon,
  Logout as LogoutIcon,
} from 'tabler-icons-react';

import { useAppDispatch, useLoggedIn, useUser } from '@/reduxHooks';
import { doLogout } from '@/redux/reducers/session';

import { Route } from '@/globals';

import ActionsMenu from '../ActionsMenu';
import ConfirmModal from '../ConfirmModal';

const useStyles = createStyles((theme) => ({
  userActions: {
    marginRight: theme.spacing.sm,
  },
}));

const UserActions = () => {
  const [logoutModal, setLogoutModal] = useState(false);

  const { classes } = useStyles();
  const { push } = useRouter();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const loggedIn = useLoggedIn();
  const user = useUser();

  const openModal = useCallback(() => setLogoutModal(true), []);
  const closeModal = useCallback(() => setLogoutModal(false), []);

  const handleLogout = useCallback(async () => {
    const res = await dispatch(doLogout());

    if (res.meta.requestStatus === 'fulfilled') {
      closeModal();
    } else {
      console.log('errors');
    }
  }, [closeModal, dispatch]);

  return (
    <>
      <div className={classes.userActions}>
        {(loggedIn && user) ? (
          <ActionsMenu buttonContent={<UserIcon />}>
            <Menu.Label>{user.name || user.email}</Menu.Label>

            <Menu.Item onClick={() => push(Route.Profile)} icon={<EditIcon />}>
              {t('general.profile')}
            </Menu.Item>

            <Divider />

            <Menu.Item onClick={openModal} icon={<LogoutIcon />}>{t('general.logout')}</Menu.Item>
          </ActionsMenu>
        ) : (
          <Link href={Route.Login} passHref>
            <Button>{t('general.login')}</Button>
          </Link>
        )}
      </div>

      <ConfirmModal
        opened={logoutModal}
        title={t('general.sure-logout')}
        onClose={closeModal}
        onAccept={handleLogout}
      />
    </>
  );
};

export default UserActions;
