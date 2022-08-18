export default interface IServiceResult {
  error?: string;
}

export const SERVICE_NOT_AVAIABLE: IServiceResult = { error: 'Service is not available' };
