import houseRulesService from '../services/house-rules-service';
import languagesService from '../services/languages-service';
import ILanguageResult from '../types/language-result.interface';
import ILanguage from '../types/language.interface';
import { actions as dataActions } from './data-slice';
import { actions, actions as languageActions } from './language-slice';
import { AppDispatch, RootState } from './store';

export const setHouseRulesServiceResultAsync = (language: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const houseRulesServiceResult = getState().data.houseRulesServiceResult;
  if (!houseRulesServiceResult || houseRulesServiceResult.language !== language) {
    houseRulesService(language)
      .then((response) => dispatch(dataActions.setHouseRulesServiceResult(response)))
      .catch((response) => dispatch(dataActions.setHouseRulesServiceResult(response)));
  }
}

export const setCurrentLanguageAsync = (language: ILanguage) => (dispatch: AppDispatch) => {
  dispatch(languageActions.setCurrent(language));
  dispatch(setHouseRulesServiceResultAsync(language.short));
}

export const initializeLanguageAsync = () => (dispatch: AppDispatch) => {
  languagesService()
    .then((result: ILanguageResult) => {
      if (result && result.languages) {
        dispatch(actions.setLanguages(result.languages));
        let currentLanguage: ILanguage | undefined;
        if (navigator.language) {
          const userLanguage = navigator.language.split('-')[0].toUpperCase();
          currentLanguage = result.languages.find(({ short }) => userLanguage === short.toUpperCase());
        } 
        
        if (!currentLanguage) {
          currentLanguage = result.languages.find((language) => language.isDefault) || result.languages[0];
        }
        
        dispatch(setCurrentLanguageAsync(currentLanguage));
      } else {
        // Todo: ?
      }      
    }).catch((err) => {
      console.log(err);
    });
}
