const { RESTDataSource } = require("apollo-datasource-rest");

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
      return this.put("update-user", { ...updateUser });
    } catch (error) {
      throw new Error(`${error.response.data}`);
    }
  }
}
