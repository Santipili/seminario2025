import { LocalStorageHandler } from "../../../common/LocalStorageHandler.js";
import { ApiClient } from "../../../common/ApiClient.js";
import { configApiFileSystem } from "../../../config.js";

class LoginFormModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient(configApiFileSystem.url);
  }
  async login(data) {
    try {
      let response = await this.apiClient.makeApiCall(
        "user/signIn",
        "POST",
        data
      );
      const user = response?.data;

      if (response.status) {
        this.localStorageH.setOnlocalStorage("userId", user.uuid);
        this.localStorageH.setOnlocalStorage("nickname", user.nickname);
        this.localStorageH.setOnlocalStorage("Token", user.token);
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { LoginFormModel };
