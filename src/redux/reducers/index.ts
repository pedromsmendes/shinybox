import session, { sessionInitialState } from './session';

const reducer = {
  [session.name]: session.reducer,
};

export const reducersInitialState = {
  session: sessionInitialState,
};

export default reducer;
