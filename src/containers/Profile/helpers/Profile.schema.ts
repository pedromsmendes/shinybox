import * as yup from 'yup';

import { type ProfileFormValues } from '../ProfileForm';

type SchemaProfile = Partial<Record<keyof ProfileFormValues, any>>;

const profileSchema = yup.object().shape<SchemaProfile>({
  email: yup.string().email().notRequired().label('E-mail'),
  name: yup.string().notRequired().nullable().label('Name'),
  avatar: yup.string().notRequired().nullable().label('Avatar'),
  password: yup.string().min(6).notRequired().label('Password'),
  passwordCheck: yup.string().oneOf([yup.ref('password')], 'Passwords must match').label('Password confirmation'),
});

export default profileSchema;
