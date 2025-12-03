class StateApplicationHandler {
  constructor() {
    this.currentState = null;
  }

  changeState(newState) {
    if (this.currentState) {
      this.currentState.remove();
    }

    this.currentState = newState;
    this.appendChild(this.currentState);
  }
}

export { StateApplicationHandler };
