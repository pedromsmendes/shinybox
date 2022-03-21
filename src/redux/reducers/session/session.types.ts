import type { UserQuery } from '@/graphql/users/User.generated';

export type LoginError = {
  code: string;
  msg: string;
};

export type SessionType = {
  loggedIn: boolean;
  loginErrors: LoginError[];
  user: NonNullable<UserQuery['user']> | null;
};