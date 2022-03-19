export type TokenInfo = {
  accessToken: string;
  accessTokenExpiracy: string;
  refreshToken: string;
  refreshTokenExpiracy: string;
};

export type RequestBodyErrorType = {
  code: string;
  msg: string;
};

export type GrantReturn = {
  data: TokenInfo | null;
  errors: RequestBodyErrorType[];
};

export type LogoutReturn = {
  sucess: boolean;
  errors: RequestBodyErrorType[];
};
