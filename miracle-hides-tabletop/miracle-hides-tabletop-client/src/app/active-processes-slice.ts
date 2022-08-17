import { createSlice } from '@reduxjs/toolkit'

const activeProcessesSlice = createSlice({
  name: 'activeProcesses',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
  }
});

export const reducer = activeProcessesSlice.reducer;

export const actions = activeProcessesSlice.actions;
