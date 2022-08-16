import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

import activeProcessesReducer, { activeProcessesSlice } from './active-processes-slice';

export const store = configureStore({
  reducer: {
    activeProcesses: activeProcessesReducer,
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export function decrementActiveProcesses() {
  store.dispatch(activeProcessesSlice.actions.decrement());
}
export function incrementActiveProcesses() {
  store.dispatch(activeProcessesSlice.actions.increment());
}
