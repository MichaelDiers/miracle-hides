import houseRulesService from '../services/house-rules-service';
import { defaultLanguage, Language, toLanguageOrDefault } from '../types/language.type';
import { actions as dataActions } from './data-slice';
import { actions as languageActions } from './language-slice';
import { AppDispatch, RootState, store } from './store';

export const setHouseRulesServiceResultAsync = (language: Language) => (dispatch: AppDispatch, getState: () => RootState) => {
  const houseRulesServiceResult = getState().data.houseRulesServiceResult;
  if (!houseRulesServiceResult || houseRulesServiceResult.language !== language) {
    houseRulesService(language)
      .then((response) => dispatch(dataActions.setHouseRulesServiceResult(response)))
      .catch((response) => dispatch(dataActions.setHouseRulesServiceResult(response)));
  }
}

export const setLanguageAsync = (language: Language) => (dispatch: AppDispatch) => {
  dispatch(languageActions.setLanguage(language));
  dispatch(setHouseRulesServiceResultAsync(language));
}

export const initializeLanguageAsync = () => (dispatch: AppDispatch) => {
  let language: Language = defaultLanguage;
  try {
    language = toLanguageOrDefault(
      navigator.language,
      document.documentElement.lang,
    ) as Language;
  } catch {
    // use default language
  }
  
  dispatch(setLanguageAsync(language));
}
