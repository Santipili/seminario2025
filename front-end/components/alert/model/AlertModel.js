import { LocalStorageHandler } from "../../core/LocalStorageHandler.js";
import { ApiClient } from "../../core/ApiClient.js";
import { configApiFileSystem } from "../../../config.js";

class AlertModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient(configApiFileSystem.url);
  }
}

export { AlertModel };
