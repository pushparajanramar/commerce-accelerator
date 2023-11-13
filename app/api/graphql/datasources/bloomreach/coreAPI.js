import { RESTDataSource } from "@apollo/datasource-rest";
import configuration from "../../../../../constants/configuration";

class BloomreachCoreAPI extends RESTDataSource {
  baseURL = process.env.BLOOMREACH_API_URL;
  async autoSuggestionByProduct(
    suggestionSource,
    filters = "",
    sort = null,
    start,
    limit
  ) {
    try {
      const suggestedProductResponse = await this.get(
        `/api/v1/core/${filters.length ? `?${filters}&` : `${filters}`}`,
        {
          params: {
            account_id: process.env.BLOOMREACH_ACCOUNT_ID,
            auth_key: process.env.BLOOMREACH_AUTH_KEY,
            domain_key: process.env.BLOOMREACH_DOMAIN_KEY,
            search_type: "keyword",
            q: suggestionSource,
            request_id: process.env.BLOOMREACH_CORE_REQUEST_ID,
            _br_uid_2: process.env.BLOOMREACH_CORE_SUGGEST_BR_UID_2,
            url: "/search/page/",
            fl: "pid,title,brand,price,product_label,sale_price,employee_price,promotion_attr,large_image,sku_color_group,url,description,other_styles,badge,product_images",
            request_type: "search",
            rows: limit,
            start: start,
            sort: sort,
          },
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          next: {
            revalidate: configuration.PLPProdcutCacheTime,
          },
        }
      );
      return suggestedProductResponse;
    } catch (ex) {
      throw ex;
    }
  }
  async productsFromCategory(
    categoryId,
    filters = "",
    sort = null,
    start,
    limit
  ) {
    try {
      const suggestedProductResponse = await this.get(
        `/api/v1/core/${filters.length ? `?${filters}&` : `${filters}`}`,
        {
          params: {
            account_id: process.env.BLOOMREACH_ACCOUNT_ID,
            auth_key: process.env.BLOOMREACH_AUTH_KEY,
            domain_key: process.env.BLOOMREACH_DOMAIN_KEY,
            search_type: "category",
            q: categoryId,
            request_id: process.env.BLOOMREACH_CORE_REQUEST_ID,
            _br_uid_2: process.env.BLOOMREACH_CORE_SUGGEST_BR_UID_2,
            url: `/c/${categoryId}`,
            fl: "pid,title,brand,price,product_label,sale_price,employee_price,promotion_attr,large_image,sku_color_group,url,description,other_styles,badge,product_images",
            request_type: "search",
            rows: limit,
            start: start,
            sort: sort,
          },
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          next: {
            revalidate: configuration.autoSuggestProdcutCacheTime,
          },
        }
      );
      return suggestedProductResponse;
    } catch (ex) {
      throw ex;
    }
  }
}

export default BloomreachCoreAPI;
