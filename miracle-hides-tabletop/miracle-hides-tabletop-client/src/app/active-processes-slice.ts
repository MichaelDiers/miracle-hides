import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface IActiveProcessesState {
  count: number;
  isActive: boolean;
}

const initialState: IActiveProcessesState = {
  count: 0,
  isActive: false,
};

export const activeProcessesSlice = createSlice({
  name: 'activeProcesses',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
      state.isActive = state.count !== 0;
    },
    decrement: (state) => {
      state.count -= 1;
      state.isActive = state.count !== 0;
    },    
  },
});

export const getIsProcessActive = (state: RootState) => state.activeProcesses.isActive;

export const { increment, decrement } = activeProcessesSlice.actions;

export default activeProcessesSlice.reducer;
