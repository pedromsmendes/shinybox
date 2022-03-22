import type initStore from './initStore';

export type AppStore = ReturnType<typeof initStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<typeof initStore>['dispatch'];