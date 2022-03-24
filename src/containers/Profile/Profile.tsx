import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNotifications } from '@mantine/notifications';
import {
  Button,
  Group,
} from '@mantine/core';

import { useUpdateUserMutation } from '@/graphql/users/UpdateUser.generated';

import { useUser } from '@/reduxHooks';

import Form from '@/components/Form';

import { useTr } from '@/tools/translator';
import normalizeGQLErrors from '@/tools/apolloClient/normalizeGQLErrors';

import ProfileForm, { type ProfileFormValues } from './ProfileForm';
import profileSchema from './helpers/Profile.schema';

const Profile = () => {
  const tr = useTr();

  const user = useUser();
  const { showNotification } = useNotifications();

  const form = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      avatar: user?.avatar || '',
      email: user?.email || '',
      name: user?.name || '',
      password: '',
      passwordCheck: '',
    },
  });

  const [updateUser] = useUpdateUserMutation();

  const handleSubmit = useCallback(async (values: ProfileFormValues) => {
    if (user) {
      try {
        const res = await updateUser({
          variables: {
            id: user?.id,
            data: {
              avatar: values.avatar || null,
              email: values.email,
              name: values.name || null,
              password: values.password || undefined,
            },
          },
        });

        if (res.data?.updateUser?.id && !res.errors?.length) {
          showNotification({ message: tr('User update successful!'), color: 'green' });
        }
      } catch (ex) {
        normalizeGQLErrors(ex).forEach((error) => {
          if (error.field in values) {
            form.setError(error.field as keyof typeof values, {
              message: error.message,
            });
          } else {
            // need to do something with other errors
          }
        });

        showNotification({ message: tr('User update failed!'), color: 'red' });
      }
    }
  }, [form, showNotification, tr, updateUser, user]);

  return (
    <div>
      <Form {...form} onSubmit={handleSubmit}>
        <Group position="right">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {tr('Save')}
          </Button>
        </Group>

        <ProfileForm />
      </Form>
    </div>
  );
};

export default Profile;
