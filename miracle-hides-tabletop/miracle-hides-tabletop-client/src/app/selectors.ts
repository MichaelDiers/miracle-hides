import { RootState } from './store';

export const selectActiveProcesses = (state: RootState) => state.activeProcesses.value;

export const selectHouseRulesServiceResult = (state: RootState) => state.data.houseRulesServiceResult;

export const selectCurrentLanguage = (state: RootState) => state.language.current;
