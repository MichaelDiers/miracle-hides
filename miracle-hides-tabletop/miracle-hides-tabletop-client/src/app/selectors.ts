import { RootState } from './store';

export const selectActiveProcesses = (state: RootState) => state.activeProcesses.value;

export const selectHouseRulesState = (state: RootState) => state.data.houseRulesState;

export const selectCurrentLanguage = (state: RootState) => state.language.current;
