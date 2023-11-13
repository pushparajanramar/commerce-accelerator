import { RESTDataSource } from "@apollo/datasource-rest";
import configuration from "../../../../../constants/configuration";

class BloomreachPathwaysAPI extends RESTDataSource {
  baseURL = process.env.BLOOMREACH_SIMILAR_ITEMS_API_URL;
  async similarItems(items, limit, start) {
    try {
      const similarItemsResponse = await this.get(
        "/api/v2/widgets/item/XgOepW",
        {
          params: {
            account_id: process.env.BLOOMREACH_ACCOUNT_ID,
            auth_key: process.env.BLOOMREACH_AUTH_KEY,
            domain_key: process.env.BLOOMREACH_DOMAIN_KEY,
            item_ids: items,
            fields: "pid,title,large_image,price,sale_price,url",
            url: "www.bloomique.com",
            _br_uid_2: process.env.BLOOMREACH_PATHWAYS_BR_UID_2,
            rows: limit,
            start: start,
          },
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          next: { revalidate: configuration.similarItemsCacheTime },
        }
      );
      return similarItemsResponse;
    } catch (ex) {
      throw ex;
    }
  }
}

export default BloomreachPathwaysAPI;
