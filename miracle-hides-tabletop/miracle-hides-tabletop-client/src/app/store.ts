import { configureStore } from '@reduxjs/toolkit'
import { reducer as activeProcesses  } from './active-processes-slice';
import { reducer as data  } from './data-slice';
import { reducer as language  } from './language-slice';

export const store = configureStore({
  reducer: {
    activeProcesses,
    data,
    language,
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
