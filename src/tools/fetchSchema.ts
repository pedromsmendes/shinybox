import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

const fetchSchema = async () => {
  if (!process.env.API_URL) {
    console.error('Missing API_URL!');
    return;
  }

  if (!process.env.API_GQL_ENDPOINT) {
    console.error('Missing API_GQL_ENDPOINT!');
    return;
  }

  const fetchRes = await fetch(`${process.env.API_URL}${process.env.API_GQL_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {},
      query: `
        query IntrospectionQuery {
          __schema {
            queryType {
              name
            }
            mutationType {
              name
            }
            subscriptionType {
              name
            }
            types {
              ...FullType
            }
            directives {
              name
              description
              locations
              args {
                ...InputValue
              }
            }
          }
        }

        fragment FullType on __Type {
          kind
          name
          description
          fields(includeDeprecated: true) {
            name
            description
            args {
              ...InputValue
            }
            type {
              ...TypeRef
            }
            isDeprecated
            deprecationReason
          }
          inputFields {
            ...InputValue
          }
          interfaces {
            ...TypeRef
          }
          enumValues(includeDeprecated: true) {
            name
            description
            isDeprecated
            deprecationReason
          }
          possibleTypes {
            ...TypeRef
          }
        }

        fragment InputValue on __InputValue {
          name
          description
          type {
            ...TypeRef
          }
          defaultValue
        }

        fragment TypeRef on __Type {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  const res = await fetchRes.json();
  writeFileSync('gqlSchema.json', JSON.stringify(res, null, 2));
};

(async () => {
  await fetchSchema();
})();
