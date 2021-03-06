const { RESTDataSource } = require("apollo-datasource-rest");
import cloudinary from "cloudinary";

export default class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/";
  }

  willSendRequest(request) {
    request.headers.set("authorization", this.context.token);
  }

  async user() {
    try {
      return this.get("user");
    } catch (error) {
      throw new Error(`${error.response.data}`);
    }
  }

  async updateUser(updateUser) {
    try {
      await cloudinary.v2.uploader.upload(updateUser.image, (error, result) => {
        // always expecting to success, need to handle errors.

        const { url: image } = result;

        return this.put("update-user", { ...updateUser, image });
      });
    } catch (error) {
      throw new Error(`${error.response.data}`);
    }
  }
}
