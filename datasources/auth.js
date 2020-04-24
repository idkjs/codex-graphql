const { RESTDataSource } = require("apollo-datasource-rest");

export default class AuthAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/";
  }

  async login({ username, password }) {
    try {
      return this.post("login", { username, password });
    } catch (error) {
      throw new Error(`${error.response.data}`);
    }
  }

  async signup({ username, password }) {
    try {
      return this.post("signup", { username, password });
    } catch (error) {
      throw new Error(`${error.response.data}`);
    }
  }
}
