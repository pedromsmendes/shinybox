import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/apolloClient';
const defaultOptions = {} as const;
export type PokemonsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PokemonsQuery = { pokemons: Array<{ id: string, name: string, dexes: Array<{ id: string, number: number, name: string }> }> };


export const PokemonsDocument = gql`
    query Pokemons {
  pokemons {
    id
    name
    dexes {
      id
      number
      name
    }
  }
}
    `;

/**
 * __usePokemonsQuery__
 *
 * To run a query within a React component, call `usePokemonsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokemonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokemonsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePokemonsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PokemonsQuery, PokemonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PokemonsQuery, PokemonsQueryVariables>(PokemonsDocument, options);
      }
export function usePokemonsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PokemonsQuery, PokemonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PokemonsQuery, PokemonsQueryVariables>(PokemonsDocument, options);
        }
export type PokemonsQueryHookResult = ReturnType<typeof usePokemonsQuery>;
export type PokemonsLazyQueryHookResult = ReturnType<typeof usePokemonsLazyQuery>;
export type PokemonsQueryResult = Apollo.QueryResult<PokemonsQuery, PokemonsQueryVariables>;
export function refetchPokemonsQuery(variables?: PokemonsQueryVariables) {
      return { query: PokemonsDocument, variables: variables }
    }