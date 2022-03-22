import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PasswordInput, TextInput } from '@mantine/core';

import { useTr } from '@/tools/translator';

export type ProfileFormValues = {
  email: string;
  password: string;
  passwordCheck: string;
  name?: string;
  avatar?: string;
};

const ProfileForm = () => {
  const tr = useTr();

  const { control, formState, getValues } = useFormContext<ProfileFormValues>();

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
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            disabled={formState.isSubmitting}
            radius="lg"
            size="md"
            label={tr('Name')}
            placeholder={tr('Eg: Bino')}
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
            required={!!getValues('passwordCheck')}
            radius="lg"
            size="md"
            label={tr('Password')}
            placeholder={tr('Eg: muchSafety123')}
          />
        )}
      />

      <Controller
        name="passwordCheck"
        control={control}
        render={({ field }) => (
          <PasswordInput
            {...field}
            disabled={formState.isSubmitting}
            required={!!getValues('password')}
            radius="lg"
            size="md"
            label={tr('Re-type password')}
            placeholder={tr('Eg: muchSafety123')}
          />
        )}
      />
    </>
  );
};

export default ProfileForm;
