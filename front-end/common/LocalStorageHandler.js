class LocalStorageHandler {
  constructor() {
    this.localStorage = window.localStorage;
  }

  setOnlocalStorage(key, value) {
    this.localStorage.setItem(key, value);
  }
  getOfLocalStorage(key) {
    return this.localStorage.getItem(key);
  }
  deleteOfLocalStorage(key) {
    this.localStorage.removeItem(key);
  }
  cleanLocalStorage() {
    this.localStorage.clear();
  }
}

export { LocalStorageHandler };
