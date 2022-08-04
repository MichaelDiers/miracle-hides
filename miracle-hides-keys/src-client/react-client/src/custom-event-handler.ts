export enum EventNames {
  ShowHeaderEvent = 'showHeaderEvent',
  ToggleThemeEvent = 'toggleThemeEvent',
}

export class CustomEventRaiser {
  static raise(eventName: string, detail: object | undefined = undefined) : void {
    document.body.dispatchEvent(
      new CustomEvent(
        eventName,
        {
          bubbles: true,
          cancelable: true,
          detail,
        },
      ),
    );
  }

  static raiseToggleTheme() : void {
    CustomEventRaiser.raise(EventNames.ToggleThemeEvent);
  }

  static raiseShowHeader(show: boolean = true) : void {    
    CustomEventRaiser.raise(EventNames.ShowHeaderEvent, { show });
  }
}

export class EventSubscriber {
  static subscribe(eventName: string, handle: (event: CustomEvent) => void) : void {
    document.body.addEventListener(eventName, (e) => handle(e as CustomEvent));
  }

  static subscribeToShowHeader(handle: (event: CustomEvent) => void) : void {    
    EventSubscriber.subscribe(EventNames.ShowHeaderEvent, handle);
  }

  static subscribeToToggleTheme(handle: (event: CustomEvent) => void) : void {
    EventSubscriber.subscribe(EventNames.ToggleThemeEvent, handle);
  }
}
