import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/apolloClient';
const defaultOptions = {} as const;
export type DexesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DexesQuery = { dexes: Array<{ id: string, name: string, pokemons: Array<{ id: string, name: string, number: number }> }> };


export const DexesDocument = gql`
    query Dexes {
  dexes {
    id
    name
    pokemons {
      id
      name
      number
    }
  }
}
    `;

/**
 * __useDexesQuery__
 *
 * To run a query within a React component, call `useDexesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDexesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDexesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDexesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DexesQuery, DexesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<DexesQuery, DexesQueryVariables>(DexesDocument, options);
      }
export function useDexesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DexesQuery, DexesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<DexesQuery, DexesQueryVariables>(DexesDocument, options);
        }
export type DexesQueryHookResult = ReturnType<typeof useDexesQuery>;
export type DexesLazyQueryHookResult = ReturnType<typeof useDexesLazyQuery>;
export type DexesQueryResult = Apollo.QueryResult<DexesQuery, DexesQueryVariables>;
export function refetchDexesQuery(variables?: DexesQueryVariables) {
      return { query: DexesDocument, variables: variables }
    }