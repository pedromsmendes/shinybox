export type Error = {
  field: string;
  msg: string;
};

declare module '@apollo/client' {
  interface GraphQLErrorExtensions {
    validationErrors: Error[];
  }
}

export { };