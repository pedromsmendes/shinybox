import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/apolloClient';
const defaultOptions = {} as const;
export type CreatePokemonMutationVariables = Types.Exact<{
  data: Types.PokemonCreate;
}>;


export type CreatePokemonMutation = { createPokemon?: { id: string, name: string, dexes: Array<{ id: string, number: number, name: string }> } | null };


export const CreatePokemonDocument = gql`
    mutation CreatePokemon($data: PokemonCreate!) {
  createPokemon(data: $data) {
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
export type CreatePokemonMutationFn = Apollo.MutationFunction<CreatePokemonMutation, CreatePokemonMutationVariables>;

/**
 * __useCreatePokemonMutation__
 *
 * To run a mutation, you first call `useCreatePokemonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePokemonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPokemonMutation, { data, loading, error }] = useCreatePokemonMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePokemonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePokemonMutation, CreatePokemonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePokemonMutation, CreatePokemonMutationVariables>(CreatePokemonDocument, options);
      }
export type CreatePokemonMutationHookResult = ReturnType<typeof useCreatePokemonMutation>;
export type CreatePokemonMutationResult = Apollo.MutationResult<CreatePokemonMutation>;
export type CreatePokemonMutationOptions = Apollo.BaseMutationOptions<CreatePokemonMutation, CreatePokemonMutationVariables>;