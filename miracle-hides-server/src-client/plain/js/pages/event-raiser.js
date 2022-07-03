class EventRaiser {
  static raise({ eventName, detail }) {
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