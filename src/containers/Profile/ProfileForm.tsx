import React, { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PasswordInput, TextInput } from '@mantine/core';

import { useTr } from '@/tools/TranslationPlaceholder';
import ImageDrop from '@/components/Dropzone';

export type ProfileFormValues = {
  email: string;
  password: string;
  passwordCheck: string;
  name?: string;
  avatar: File | string | null;
};

const ProfileForm = () => {
  const tr = useTr();

  const { control, formState, getValues, setValue } = useFormContext<ProfileFormValues>();

  const handleImageDrop = useCallback((newFile: File) => {
    setValue('avatar', newFile);
  }, [setValue]);

  return (
    <>
      <Controller
        name="avatar"
        control={control}
        render={({ field }) => (
          <ImageDrop
            {...field}
            onDrop={handleImageDrop}
            disabled={formState.isSubmitting}
            error={formState.errors.email?.message}
            image={field.value}
          />
        )}
      />

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
            error={formState.errors.email?.message}
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
            error={formState.errors.name?.message}
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
            error={formState.errors.password?.message}
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
            error={formState.errors.passwordCheck?.message}
          />
        )}
      />
    </>
  );
};

export default ProfileForm;
