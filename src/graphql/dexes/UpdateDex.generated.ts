import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/apolloClient';
const defaultOptions = {} as const;
export type UpdateDexMutationVariables = Types.Exact<{
  data: Types.DexUpdate;
}>;


export type UpdateDexMutation = { updateDex?: { id: string, name: string, pokemons: Array<{ id: string, number: number, name: string }> } | null };


export const UpdateDexDocument = gql`
    mutation UpdateDex($data: DexUpdate!) {
  updateDex(data: $data) {
    id
    name
    pokemons {
      id
      number
      name
    }
  }
}
    `;
export type UpdateDexMutationFn = Apollo.MutationFunction<UpdateDexMutation, UpdateDexMutationVariables>;

/**
 * __useUpdateDexMutation__
 *
 * To run a mutation, you first call `useUpdateDexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDexMutation, { data, loading, error }] = useUpdateDexMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDexMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateDexMutation, UpdateDexMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateDexMutation, UpdateDexMutationVariables>(UpdateDexDocument, options);
      }
export type UpdateDexMutationHookResult = ReturnType<typeof useUpdateDexMutation>;
export type UpdateDexMutationResult = Apollo.MutationResult<UpdateDexMutation>;
export type UpdateDexMutationOptions = Apollo.BaseMutationOptions<UpdateDexMutation, UpdateDexMutationVariables>;