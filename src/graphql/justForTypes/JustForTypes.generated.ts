import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/apolloClient';
const defaultOptions = {} as const;
export type JustForTypesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type JustForTypesQuery = { justForTypes?: { message: string, field: string, code?: Types.Code | null } | null };


export const JustForTypesDocument = gql`
    query JustForTypes {
  justForTypes {
    message
    field
    code
  }
}
    `;

/**
 * __useJustForTypesQuery__
 *
 * To run a query within a React component, call `useJustForTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useJustForTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJustForTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useJustForTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<JustForTypesQuery, JustForTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<JustForTypesQuery, JustForTypesQueryVariables>(JustForTypesDocument, options);
      }
export function useJustForTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<JustForTypesQuery, JustForTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<JustForTypesQuery, JustForTypesQueryVariables>(JustForTypesDocument, options);
        }
export type JustForTypesQueryHookResult = ReturnType<typeof useJustForTypesQuery>;
export type JustForTypesLazyQueryHookResult = ReturnType<typeof useJustForTypesLazyQuery>;
export type JustForTypesQueryResult = Apollo.QueryResult<JustForTypesQuery, JustForTypesQueryVariables>;
export function refetchJustForTypesQuery(variables?: JustForTypesQueryVariables) {
      return { query: JustForTypesDocument, variables: variables }
    }