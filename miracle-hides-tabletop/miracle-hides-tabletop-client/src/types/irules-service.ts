import IRulesServiceResult from './irules-service-result';

export default interface IRulesService {
  (): Promise<IRulesServiceResult>;
}
