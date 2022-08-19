import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import houseRulesService from '../services/house-rules-service';
import IHouseRulesServiceResult from '../types/house-rules-service-result.interface';
import IHouseRulesState from '../types/house-rules-state.interface';
import type { RootState } from './store';

interface IDataState {
  houseRulesState: IHouseRulesState;
}

const initialState: IDataState = {
  houseRulesState: {
    isLoading: false,
  },
};

const translationsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchHouseRulesAsync.fulfilled, (state, action) => {
      if (action.payload) {
        const { houseRules, headline, language } = action.payload;
        state.houseRulesState = {
          ...state.houseRulesState,
          error: undefined,
          headline,
          houseRules,
          language,
          isLoading: false,
        };        
      }      
    });
    builder.addCase(fetchHouseRulesAsync.pending, (state) => {
      state.houseRulesState.isLoading = true;
    });
    builder.addCase(fetchHouseRulesAsync.rejected, (state, action) => {
      state.houseRulesState = { 
        ...state.houseRulesState,
        error: action.error.message,
        headline: undefined,
        houseRules: undefined,
        language: undefined,
        isLoading: false,
      };
    });
  }
});

export const reducer = translationsSlice.reducer;

export const actions = translationsSlice.actions;

export const fetchHouseRulesAsync = createAsyncThunk<IHouseRulesServiceResult|undefined, string, { state: RootState }>(
  'data/fetchHouseRules',
  async (language: string, { getState }) => {
    const current = getState().data.houseRulesState;
    if (!current || !current.houseRules || current.language !== language) {
      return houseRulesService(language);
    }
  },
);