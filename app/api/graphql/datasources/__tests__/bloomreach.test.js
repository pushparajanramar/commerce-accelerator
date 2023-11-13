import configuration from "../../../../../constants/configuration";
import BloomreachCoreAPI from "../bloomreach/coreAPI";
import BloomreachPathwaysAPI from "../bloomreach/pathwaysAPI";
import BloomreachRelatedAPI from "../bloomreach/relatedAPI";
import BloomreachSuggestAPI from "../bloomreach/suggestAPI";

const mocks = {
  get: jest.fn(),
};

const BloomreachCoreAPIDS = new BloomreachCoreAPI();
const BloomreachPathawaysAPIDS = new BloomreachPathwaysAPI();
const BloomreachRelatedAPIDS = new BloomreachRelatedAPI();
const BloomreachSuggestAPIDS = new BloomreachSuggestAPI();

BloomreachCoreAPIDS.get = mocks.get;
BloomreachPathawaysAPIDS.get = mocks.get;
BloomreachRelatedAPIDS.get = mocks.get;
BloomreachSuggestAPIDS.get = mocks.get;

mocks.get.mockReturnValueOnce({});

process.env.BLOOMREACH_AUTH_KEY = "key123";
process.env.BLOOMREACH_DOMAIN_KEY = "tm123";
process.env.BLOOMREACH_ACCOUNT_ID = "acct_123";
process.env.BLOOMREACH_CORE_REQUEST_ID = "id123";
process.env.BLOOMREACH_SUGGEST_REQUEST_ID = "id456";
process.env.BLOOMREACH_CORE_SUGGET_BR_UID_2 = "uid%123%456%789";

const suggestionSource = "CLOUD FLANNEL BUTTON-UP";
const start = "0";
const limit = "4";
const sort = null;
const categoryId = "123";
const items = "1MM211_4VIL_";
const productUrl =
  "https://www.travismathew.com/TM/TOPS/Button-Ups/DIVE-IN/p/1MR511_1WHT_";
const productIds = ["1MX435_4FDD_"];
const noFilters = "";
const filterParameters =
  "Gender:male;brand:TM;sizes:m;color_groups:blue;type:Hoodie;type:Full%20Zip";

describe("[BloomreachCoreAPI.autoSuggestionByProduct]", () => {
  it("properly issues a get request for suggestions based on a product without filters", async () => {
    await BloomreachCoreAPIDS.autoSuggestionByProduct(
      suggestionSource,
      noFilters,
      sort,
      start,
      limit
    );
    expect(mocks.get).toBeCalledWith("/api/v1/core/", {
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
    });
  });
  it("properly issues a get request for suggestions based on a product with filters", async () => {
    await BloomreachCoreAPIDS.autoSuggestionByProduct(
      suggestionSource,
      filterParameters,
      sort,
      start,
      limit
    );
    expect(mocks.get).toBeCalledWith(`/api/v1/core/?${filterParameters}&`, {
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
    });
  });
});

describe("[BloomreachCoreAPI.productsFromCategory]", () => {
  it("properly issues a get request for suggestions based on a category id without filters present", async () => {
    await BloomreachCoreAPIDS.productsFromCategory(
      categoryId,
      noFilters,
      sort,
      start,
      limit
    );
    expect(mocks.get).toBeCalledWith("/api/v1/core/", {
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
    });
  });
  it("properly issues a get request for suggestions based on a category id with filters present", async () => {
    await BloomreachCoreAPIDS.productsFromCategory(
      categoryId,
      filterParameters,
      sort,
      start,
      limit
    );
    expect(mocks.get).toBeCalledWith(`/api/v1/core/?${filterParameters}&`, {
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
    });
  });
});

describe("[BloomreacPathwaysAPI.similarItems]", () => {
  it("properly issues a get request for items similar to the provided item(s)", async () => {
    await BloomreachPathawaysAPIDS.similarItems(items, limit, start);
    expect(mocks.get).toBeCalledWith("/api/v2/widgets/item/XgOepW", {
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
    });
  });
});

describe("[BloomreacSuggestAPI.autoSuggestions]", () => {
  it("properly issues a get request for suggestions based on a given suggestion source", async () => {
    await BloomreachSuggestAPIDS.autoSuggestions(suggestionSource);
    expect(mocks.get).toBeCalledWith("/api/v1/suggest", {
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
  });
});

describe("[BloomreacRelatedAPI.relatedItemsCategoriesProducts]", () => {
  it("properly issues a get request for related items, categories and products given a product url", async () => {
    await BloomreachRelatedAPIDS.relatedItemsCategoriesProducts(productUrl);
    expect(mocks.get).toBeCalledWith("/v3/fetch_widget", {
      params: {
        acct_id: process.env.BLOOMREACH_ACCOUNT_ID,
        acct_auth: process.env.BLOOMREACH_AUTH_KEY,
        api_host: process.env.BLOOMREACH_RELATED_API_HOST,
        ptype: "product",
        url: productUrl,
        output_format: "br_json",
      },
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      next: { revalidate: configuration.relatedAllItemsCacheTime },
    });
  });
});
