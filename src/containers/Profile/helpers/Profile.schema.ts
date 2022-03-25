import * as yup from 'yup';

import { type ProfileFormValues } from '../ProfileForm';

type SchemaProfile = Partial<Record<keyof ProfileFormValues, any>>;

const profileSchema = yup.object().shape<SchemaProfile>({
  email: yup
    .string()
    .email()
    .notRequired()
    .label('E-mail'),
  name: yup
    .string()
    .notRequired()
    .nullable()
    .label('Name'),
  avatar: yup
    .mixed()
    .notRequired()
    .nullable()
    .label('Avatar'),
  password: yup
    .string()
    .notRequired()
    .nullable()
    .transform((_, value: string) => value.length === 0 ? null : value) // turn null to ignore min()
    .min(6)
    .label('Password'),
  passwordCheck: yup
    .string()
    .nullable()
    .transform((_, value: string) => value.length === 0 ? null : value)
    .oneOf([yup.ref('password')], 'Passwords must match')
    .label('Password confirmation'),
});

export default profileSchema;
