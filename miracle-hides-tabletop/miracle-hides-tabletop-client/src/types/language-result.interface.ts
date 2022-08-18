import ILanguage from './language.interface';
import IServiceResult from './service-result.interface';

export default interface ILanguageResult extends IServiceResult {
  languages?: ILanguage[];
}
