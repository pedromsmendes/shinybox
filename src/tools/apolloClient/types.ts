import type { GraphqlError } from '@/graphql/types.generated';

export type Error = {
  field: string;
  msg: string;
};

// Exctract node type from arrays with edges and nodes
export type QueryNode<TQuery> = TQuery extends { [K in keyof Omit<TQuery, '__typename'>]: { edges: Array<{ node: any }> } }
  ? TQuery[keyof TQuery]['edges'][number]['node']
  : never;

// Exctract array of nodes type from arrays with edges and nodes
export type QueryNodes<TQuery> = QueryNode<TQuery>[];

declare module 'graphql/error' {
  interface GraphQLErrorExtensions {
    validationErrors: GraphqlError[];
  }
}

export { };