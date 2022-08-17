import { RootState } from './store';

export const selectHouseRulesServiceResult = (state: RootState) => state.data.houseRulesServiceResult;

export const selectActiveProcesses = (state: RootState) => state.activeProcesses.value;
