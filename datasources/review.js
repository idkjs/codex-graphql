const { RESTDataSource } = require("apollo-datasource-rest");
import cloudinary from "cloudinary";

export default class ReviewAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/";
  }

  willSendRequest(request) {
    request.headers.set("authorization", this.context.token);
  }

  async addReview({
    review,
    userId,
    userName,
    bookTitle,
    bookSubTitle,
    bookAuthor,
    bookLanguage,
    image,
  }) {
    await cloudinary.v2.uploader.upload(image, (error, result) => {
      // always expecting to success, need to handle errors.

      const { url: image } = result;

      return this.post("add-review", {
        review,
        userId,
        userName,
        bookTitle,
        bookSubTitle,
        bookAuthor,
        bookLanguage,
        image,
      });
    });
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
