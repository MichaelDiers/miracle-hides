export enum EventNames {
  ProcessEndEvent = 'processEndEvent',
  ProcessStartEvent = 'processStartEvent',
  ToggleLanguageEvent = 'toggleLanguageEvent',
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

  static raiseProcessEnd() : void {
    CustomEventRaiser.raise(EventNames.ProcessEndEvent);
  }

  static raiseProcessStart() : void {
    CustomEventRaiser.raise(EventNames.ProcessStartEvent);
  }

  static raiseToggleLanguage() : void {
    CustomEventRaiser.raise(EventNames.ToggleLanguageEvent);
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

  static subscribeToProcessEnd(handle: (event: CustomEvent) => void) : void {
    EventSubscriber.subscribe(EventNames.ProcessEndEvent, handle);
  }

  static subscribeToProcessStart(handle: (event: CustomEvent) => void) : void {
    EventSubscriber.subscribe(EventNames.ProcessStartEvent, handle);
  }

  static subscribeToToggleLanguage(handle: (event: CustomEvent) => void) : void {    
    EventSubscriber.subscribe(EventNames.ToggleLanguageEvent, handle);
  }

  static subscribeToShowHeader(handle: (event: CustomEvent) => void) : void {    
    EventSubscriber.subscribe(EventNames.ShowHeaderEvent, handle);
  }

  static subscribeToToggleTheme(handle: (event: CustomEvent) => void) : void {
    EventSubscriber.subscribe(EventNames.ToggleThemeEvent, handle);
  }
}
