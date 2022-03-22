import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useNotifications } from '@mantine/notifications';
import {
  Button,
  Group,
} from '@mantine/core';

import { useUpdateUserMutation } from '@/graphql/users/UpdateUser.generated';

import { useUser } from '@/reduxHooks';

import Form from '@/components/Form';

import { useTr } from '@/tools/translator';

import ProfileForm, { type ProfileFormValues } from './ProfileForm';

const Profile = () => {
  const tr = useTr();

  const user = useUser();
  const notifications = useNotifications();

  const form = useForm<ProfileFormValues>({
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
        notifications.showNotification({ message: tr('User update successful!'), color: 'green' });
      } else {
        notifications.showNotification({ message: tr('User update failed!'), color: 'red' });
      }
    }
  }, [notifications, tr, updateUser, user]);

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
