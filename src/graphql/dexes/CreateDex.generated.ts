import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/apolloClient';
const defaultOptions = {} as const;
export type CreateDexMutationVariables = Types.Exact<{
  data: Types.DexCreate;
}>;


export type CreateDexMutation = { createDex?: { id: number, name: string, pokemons: Array<{ id: number, number: number, name: string }> } | null };


export const CreateDexDocument = gql`
    mutation CreateDex($data: DexCreate!) {
  createDex(data: $data) {
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
export type CreateDexMutationFn = Apollo.MutationFunction<CreateDexMutation, CreateDexMutationVariables>;

/**
 * __useCreateDexMutation__
 *
 * To run a mutation, you first call `useCreateDexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDexMutation, { data, loading, error }] = useCreateDexMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDexMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDexMutation, CreateDexMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateDexMutation, CreateDexMutationVariables>(CreateDexDocument, options);
      }
export type CreateDexMutationHookResult = ReturnType<typeof useCreateDexMutation>;
export type CreateDexMutationResult = Apollo.MutationResult<CreateDexMutation>;
export type CreateDexMutationOptions = Apollo.BaseMutationOptions<CreateDexMutation, CreateDexMutationVariables>;