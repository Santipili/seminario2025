import { LocalStorageHandler } from "../../../common/LocalStorageHandler.js";
import { ApiClient } from "../../../common/ApiClient.js";
import { configApiFileSystem } from "../../../config.js";

class SignUpModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient(configApiFileSystem.url);
  }
  async signUp(data) {
    try {
      let response = await this.apiClient.makeApiCall(
        "user/register",
        "POST",
        data
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export { SignUpModel };
