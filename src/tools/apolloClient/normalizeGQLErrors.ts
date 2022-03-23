import { ApolloError } from '@apollo/client';
import type { GraphqlError } from '@/graphql/types.generated';

const normalizeGQLErrors = (exception: any) => {
  if (exception instanceof ApolloError) {
    const errors: GraphqlError[] = [];

    exception.graphQLErrors.map((gqlError) => {
      errors.push(...(gqlError?.extensions?.validationErrors || []));
    });

    return errors;
  }

  throw exception;
};

export default normalizeGQLErrors;
