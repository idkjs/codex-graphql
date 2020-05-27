const { RESTDataSource } = require("apollo-datasource-rest");

export default class ReviewAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/";
  }

  willSendRequest(request) {
    request.headers.set("authorization", this.context.token);
  }

  async addReview({ review, userId }) {
    return this.post("add-review", { review, userId });
  }

  async getReview(id) {
    return this.get(`review/${id}`);
  }

  async getUserReviews(id) {
    return this.get(`user-reviews/${id}`);
  }

  async getReviews() {
    return this.get("reviews");
  }
}
