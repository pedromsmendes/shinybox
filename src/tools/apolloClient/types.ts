import type { GraphqlError } from '@/graphql/types.generated';

export type Error = {
  field: string;
  msg: string;
};

declare module 'graphql/error' {
  interface GraphQLErrorExtensions {
    validationErrors: GraphqlError[];
  }
}

export { };