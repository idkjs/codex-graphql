const { RESTDataSource } = require("apollo-datasource-rest");

export default class ReviewAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.token);
  }

  async addReview({ review }) {
    return this.post("add-review", { review });
  }

  async getReview(id) {
    return this.get(`review/${id}`);
  }

  async getReviews() {
    return this.get("reviews");
  }
}
