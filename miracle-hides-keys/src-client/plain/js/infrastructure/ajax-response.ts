export default class AjaxResponse {
  constructor(
    readonly status: number,
    readonly data: object = {},
  ) {}

  get success() {
    return this.status > 199 && this.status < 300;
  }
}
