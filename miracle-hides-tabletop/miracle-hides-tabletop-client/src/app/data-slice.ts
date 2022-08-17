import { createSlice } from '@reduxjs/toolkit'
import IHouseRulesServiceResult from '../types/house-rules-service-result.interface';

interface IDataState {
  houseRulesServiceResult?: IHouseRulesServiceResult;
}

const initialState: IDataState = { };

const translationsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {    
    setHouseRulesServiceResult: (state, action) => {
      state.houseRulesServiceResult = action.payload;
    },    
  }
});

export const reducer = translationsSlice.reducer;

export const actions = translationsSlice.actions;
