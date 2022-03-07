import type {
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  DocumentNode,
} from '@apollo/client';

import { useQuery } from '@apollo/client/react/hooks';

export const useQueryWithPrevious = <TQuery = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TQuery, TVariables>,
  options: QueryHookOptions<TQuery, TVariables>,
): Omit<QueryResult<TQuery, TVariables>, 'previousData'> => {
  const {
    previousData,
    data = previousData,
    ...rest
  } = useQuery<TQuery, TVariables>(query, options);

  return { data, ...rest };
};
