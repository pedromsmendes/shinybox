import type { UserQuery } from '@/graphql/users/User.generated';

export type LoginError = {
  code: string;
  msg: string;
};

export type SessionUser = NonNullable<UserQuery['user']> | null;

export enum Language {
  EN = 'en',
  PT = 'pt',
}

export type SessionType = {
  loggedIn: boolean;
  loginErrors: LoginError[];
  user: SessionUser;
};