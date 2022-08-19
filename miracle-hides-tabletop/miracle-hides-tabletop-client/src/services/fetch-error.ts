export default class FetchError extends Error {
  private readonly status?: number;

  constructor({ message, status } : { message?: string, status?: number }) {
    super(message);

    this.status = status;
  }
}