import { RESTDataSource } from "@apollo/datasource-rest";
import configuration from "../../../../../constants/configuration";

class BloomreachSuggestAPI extends RESTDataSource {
  baseURL = process.env.BLOOMREACH_AUTOSUGGEST_URL;
  async autoSuggestions(suggestionSource) {
    try {
      const autoSuggestResponse = this.get(`/api/v1/suggest`, {
        params: {
          account_id: process.env.BLOOMREACH_ACCOUNT_ID,
          auth_key: process.env.BLOOMREACH_AUTH_KEY,
          domain_key: process.env.BLOOMREACH_DOMAIN_KEY,
          q: suggestionSource,
          request_id: process.env.BLOOMREACH_SUGGEST_REQUEST_ID,
          _br_uid_2: process.env.BLOOMREACH_CORE_SUGGEST_BR_UID_2,
          url: "/search/autocomplete/TMSearchBoxComponent",
          request_type: "suggest",
        },
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        next: {
          revalidate: configuration.autoSuggestProdcutCacheTime,
        },
      });
      return autoSuggestResponse;
    } catch (ex) {
      throw ex;
    }
  }
}

export default BloomreachSuggestAPI;
