import session, { sessionInitialState } from './session';

const reducer = {
  session,
};

export const reducersInitialState = {
  session: sessionInitialState,
};

export default reducer;
