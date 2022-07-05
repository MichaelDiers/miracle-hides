export default class CustomEventRaiser {
  static raise(eventName: string, detail: object | undefined = undefined) : void {
    document.body.dispatchEvent(
      new CustomEvent(
        eventName,
        {
          bubbles: true,
          cancelable: true,
          detail
        },
      ),
    );
  }
}
