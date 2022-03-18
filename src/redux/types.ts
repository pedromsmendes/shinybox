import type initStore from './initStore';

export type RootState = ReturnType<ReturnType<typeof initStore>['getState']>;
export type AppDispatch = ReturnType<typeof initStore>['dispatch'];