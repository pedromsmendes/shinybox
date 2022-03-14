import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/apolloClient';
const defaultOptions = {} as const;
export type RemovePokemonsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']> | Types.Scalars['Int'];
}>;


export type RemovePokemonsMutation = { removePokemons: number };


export const RemovePokemonsDocument = gql`
    mutation RemovePokemons($ids: [Int!]!) {
  removePokemons(ids: $ids)
}
    `;
export type RemovePokemonsMutationFn = Apollo.MutationFunction<RemovePokemonsMutation, RemovePokemonsMutationVariables>;

/**
 * __useRemovePokemonsMutation__
 *
 * To run a mutation, you first call `useRemovePokemonsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePokemonsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePokemonsMutation, { data, loading, error }] = useRemovePokemonsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemovePokemonsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemovePokemonsMutation, RemovePokemonsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemovePokemonsMutation, RemovePokemonsMutationVariables>(RemovePokemonsDocument, options);
      }
export type RemovePokemonsMutationHookResult = ReturnType<typeof useRemovePokemonsMutation>;
export type RemovePokemonsMutationResult = Apollo.MutationResult<RemovePokemonsMutation>;
export type RemovePokemonsMutationOptions = Apollo.BaseMutationOptions<RemovePokemonsMutation, RemovePokemonsMutationVariables>;