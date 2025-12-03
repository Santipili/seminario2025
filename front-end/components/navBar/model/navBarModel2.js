import { LocalStorageHandler } from "../../../common/LocalStorageHandler.js";
import { ApiClient } from "../../../common/ApiClient.js";
import { configApiFileSystem } from "../../../config.js";

class navBarModel2 {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient(configApiFileSystem.url);
  }
  async logout() {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      let response = await this.apiClient.makeApiCall(
        "user/logout",
        "POST",
        null,
        "hsavhavdhavdha",
        userId
      );
      this.localStorageH.cleanLocalStorage();

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export { navBarModel2 };
