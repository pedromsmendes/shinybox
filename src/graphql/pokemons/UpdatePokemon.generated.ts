import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/apolloClient';
const defaultOptions = {} as const;
export type UpdatePokemonMutationVariables = Types.Exact<{
  data: Types.PokemonUpdate;
}>;


export type UpdatePokemonMutation = { updatePokemon?: { id: string, name: string, dexes: Array<{ id: string, number: number, name: string }> } | null };


export const UpdatePokemonDocument = gql`
    mutation UpdatePokemon($data: PokemonUpdate!) {
  updatePokemon(data: $data) {
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
export type UpdatePokemonMutationFn = Apollo.MutationFunction<UpdatePokemonMutation, UpdatePokemonMutationVariables>;

/**
 * __useUpdatePokemonMutation__
 *
 * To run a mutation, you first call `useUpdatePokemonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePokemonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePokemonMutation, { data, loading, error }] = useUpdatePokemonMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePokemonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePokemonMutation, UpdatePokemonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdatePokemonMutation, UpdatePokemonMutationVariables>(UpdatePokemonDocument, options);
      }
export type UpdatePokemonMutationHookResult = ReturnType<typeof useUpdatePokemonMutation>;
export type UpdatePokemonMutationResult = Apollo.MutationResult<UpdatePokemonMutation>;
export type UpdatePokemonMutationOptions = Apollo.BaseMutationOptions<UpdatePokemonMutation, UpdatePokemonMutationVariables>;