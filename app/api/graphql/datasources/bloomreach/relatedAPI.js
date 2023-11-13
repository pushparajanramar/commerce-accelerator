import { RESTDataSource } from "@apollo/datasource-rest";
import configuration from "../../../../../constants/configuration";

class BloomreachRelatedAPI extends RESTDataSource {
  baseURL = process.env.BLOOMREACH_RELATED_ALL_API_URL;
  async relatedItemsCategoriesProducts(productURL) {
    try {
      const relatedProductsResponse = await this.get("/v3/fetch_widget", {
        params: {
          acct_id: process.env.BLOOMREACH_ACCOUNT_ID,
          acct_auth: process.env.BLOOMREACH_AUTH_KEY,
          api_host: process.env.BLOOMREACH_RELATED_API_HOST,
          ptype: "product",
          url: productURL,
          output_format: "br_json",
        },
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        next: { revalidate: configuration.relatedAllItemsCacheTime },
      });
      return relatedProductsResponse;
    } catch (ex) {
      throw ex;
    }
  }
}

export default BloomreachRelatedAPI;
