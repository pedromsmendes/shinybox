import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/apolloClient';
const defaultOptions = {} as const;
export type RemoveDexesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type RemoveDexesMutation = { removeDexes: number };


export const RemoveDexesDocument = gql`
    mutation RemoveDexes($ids: [String!]!) {
  removeDexes(ids: $ids)
}
    `;
export type RemoveDexesMutationFn = Apollo.MutationFunction<RemoveDexesMutation, RemoveDexesMutationVariables>;

/**
 * __useRemoveDexesMutation__
 *
 * To run a mutation, you first call `useRemoveDexesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDexesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDexesMutation, { data, loading, error }] = useRemoveDexesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemoveDexesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveDexesMutation, RemoveDexesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveDexesMutation, RemoveDexesMutationVariables>(RemoveDexesDocument, options);
      }
export type RemoveDexesMutationHookResult = ReturnType<typeof useRemoveDexesMutation>;
export type RemoveDexesMutationResult = Apollo.MutationResult<RemoveDexesMutation>;
export type RemoveDexesMutationOptions = Apollo.BaseMutationOptions<RemoveDexesMutation, RemoveDexesMutationVariables>;