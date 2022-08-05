export enum EventNames {
  CreateKeysEvent = 'createKeysEvent',
  KeysCreatedEvent = 'KeysCreatedEvent',

  ProcessEndEvent = 'processEndEvent',
  ProcessStartEvent = 'processStartEvent',
  ToggleLanguageEvent = 'toggleLanguageEvent',
  ShowHeaderEvent = 'showHeaderEvent',
  ToggleThemeEvent = 'toggleThemeEvent',
}

export class CustomEventRaiser {
  static raise(eventName: string, detail: object | undefined = undefined) : void {
    console.log('raise', eventName);
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

  static raiseCreateKeys(detail: object) {
    CustomEventRaiser.raise(EventNames.CreateKeysEvent, detail);
  }

  static raiseKeysCreated(detail: object) {
    CustomEventRaiser.raise(EventNames.KeysCreatedEvent, detail);
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
  private static subscribe(eventName: string, handle: (event: Event) => void, unsubscribe : boolean) : void {
    console.log('sub', eventName);
    if (unsubscribe) {
      document.body.removeEventListener(eventName, handle);
    }

    document.body.addEventListener(eventName, handle);
  }  

  static subscribeToCreateKeys(handle: (event: Event) => void) : void {
    EventSubscriber.subscribe(EventNames.CreateKeysEvent, handle, false);
  }

  static subscribeToKeysCreated(handle: (event: Event) => void) : void {
    EventSubscriber.subscribe(EventNames.KeysCreatedEvent, handle, false);
  }

  static subscribeToProcessEnd(handle: (event: Event) => void, unsubscribe : boolean = true) : void {
    EventSubscriber.subscribe(EventNames.ProcessEndEvent, handle, unsubscribe);
  }

  static subscribeToProcessStart(handle: (event: Event) => void, unsubscribe : boolean = true) : void {
    EventSubscriber.subscribe(EventNames.ProcessStartEvent, handle, unsubscribe);
  }

  static subscribeToToggleLanguage(handle: (event: Event) => void, unsubscribe : boolean = true) : void {    
    EventSubscriber.subscribe(EventNames.ToggleLanguageEvent, handle, unsubscribe);
  }

  static subscribeToShowHeader(handle: (event: Event) => void, unsubscribe : boolean = true) : void {    
    EventSubscriber.subscribe(EventNames.ShowHeaderEvent, handle, unsubscribe);
  }

  static subscribeToToggleTheme(handle: (event: Event) => void, unsubscribe : boolean = true) : void {
    EventSubscriber.subscribe(EventNames.ToggleThemeEvent, handle, unsubscribe);
  }
}

export class EventUnsubscriber {
  static unsubscribe(eventName: string, handle: (event: Event) => void) : void {
    console.log('unsub', eventName);
    document.body.removeEventListener(eventName, handle);
  }  

  static unsubscribeToCreateKeys(handle: (event: Event) => void) : void {
    EventUnsubscriber.unsubscribe(EventNames.CreateKeysEvent, handle);
  }

  static unsubscribeToKeysCreated(handle: (event: Event) => void) : void {
    EventUnsubscriber.unsubscribe(EventNames.KeysCreatedEvent, handle);
  }

  static unsubscribeToProcessEnd(handle: (event: Event) => void) : void {
    EventUnsubscriber.unsubscribe(EventNames.ProcessEndEvent, handle);
  }

  static unsubscribeToProcessStart(handle: (event: Event) => void) : void {
    EventUnsubscriber.unsubscribe(EventNames.ProcessStartEvent, handle);
  }

  static unsubscribeToToggleLanguage(handle: (event: Event) => void) : void {    
    EventUnsubscriber.unsubscribe(EventNames.ToggleLanguageEvent, handle);
  }

  static unsubscribeToShowHeader(handle: (event: Event) => void) : void {    
    EventUnsubscriber.unsubscribe(EventNames.ShowHeaderEvent, handle);
  }

  static unsubscribeToToggleTheme(handle: (event: Event) => void) : void {
    EventUnsubscriber.unsubscribe(EventNames.ToggleThemeEvent, handle);
  }
}
