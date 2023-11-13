import configuration from "../../../../../constants/configuration";
import HybrisAPI from "../hybrisOCC/hybrisAPI";

const mocks = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
};

const hybrisOCCDS = new HybrisAPI();
hybrisOCCDS.get = mocks.get;
hybrisOCCDS.post = mocks.post;
hybrisOCCDS.put = mocks.put;

mocks.get.mockReturnValueOnce({});
mocks.post.mockReturnValueOnce({});
mocks.put.mockReturnValueOnce({});

process.env.HYBRIS_BASE_SITE_IDENTIFIER = "b2c-us";

const token = "JX3levHigPPdwwlUNVqwsQJkofA";
const userEmail = "dummy.email@callawaygolf.com";
const anonymous = "anonymous";
const anonymousCartGuid = "3f6cabf3-ad01-47df-8da5-a0c4ccc248bc";
const loggedInCartGuid = "abb87ce8-7cfb-4c34-8cd1-266af2efc42f";
const loggedInCartCode = "CART-50610967";
const quantity = "99";
const entryNumber = "2";
const code = "1MY120_4HTM_M";
const product = {
  code,
  quantity,
};
const categoryId = "0133";

describe("[HybrisAPI.productDetails]", () => {
  it("properly issues a get request for more product details", async () => {
    await hybrisOCCDS.productDetails(code);
    expect(mocks.get).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/products/${code}`,
      {
        params: {
          fields: "FULL",
        },
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        next: {
          revalidate: configuration.PDPProdcutCacheTime,
        },
      }
    );
  });
});
describe("[HybrisAPI.breacrumbDetails]", () => {
  it("properly issuesa get request for a category's breadcrumbs", async () => {
    await hybrisOCCDS.breadcrumbDetails(categoryId);
    expect(mocks.get).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/catalogs/categories/${categoryId}`,
      {
        params: {
          fields: "FULL",
        },
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        next: {
          revalidate: configuration.PDPProdcutCacheTime,
        },
      }
    );
  });
});
describe("[HybrisAPI.categoryFacets]", () => {
  it("properly issues a get request for a category's facets", async () => {
    await hybrisOCCDS.categoryFacets(categoryId);
    expect(mocks.get).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/catalogs/masterProductCatalog/Online/categories/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        next: {
          revalidate: configuration.CategoryFacetCacheTime,
        },
      }
    );
  });
});
describe("[HybrisAPI.carts]", () => {
  it("properly issues get request for a user's carts", async () => {
    await hybrisOCCDS.carts(userEmail, token);
    expect(mocks.get).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${userEmail}/carts`,
      {
        params: {
          fields: "DEFAULT",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
});
describe("[HybrisAPI.cart]", () => {
  it("properly issues a cart request for a loggedin user", async () => {
    await hybrisOCCDS.cart(userEmail, loggedInCartCode, token);
    expect(mocks.get).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${userEmail}/carts/${loggedInCartCode}`,
      {
        params: {
          fields: "DEFAULT",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });

  it("properly issues a cart request for an anonymous user", async () => {
    await hybrisOCCDS.cart(anonymous, anonymousCartGuid, token);
    expect(mocks.get).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${anonymous}/carts/${anonymousCartGuid}`,
      {
        params: {
          fields: "DEFAULT",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
});
describe("[HybrisAPI.cartEntries]", () => {
  it("properly issues a post to retrieve the anonymous cart entries", async () => {
    await hybrisOCCDS.cartEntries(anonymous, anonymousCartGuid, token);
    expect(mocks.get).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${anonymous}/carts/${anonymousCartGuid}/entries`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
  it("properly issues a post to retrieve the user cart entries", async () => {
    await hybrisOCCDS.cartEntries(userEmail, loggedInCartCode, token);
    expect(mocks.get).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${userEmail}/carts/${loggedInCartCode}/entries`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
});
describe("[HybrisAPI.createHybrisClient]", () => {
  it("properly issues a request to create a hybris client token", async () => {
    process.env.HYBRIS_CLIENT_ID = "client";
    process.env.HYBRIS_CLIENT_SECRET = "secret";
    await hybrisOCCDS.hybrisClientToken();
    expect(mocks.post).toBeCalledWith(
      `/authorizationserver/oauth/token?client_id=client&client_secret=secret&grant_type=client_credentials`,
      {
        grant_type: "client_credentials",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  });
});
describe("[HybrisAPI.createCart]", () => {
  it("properly issues a call to create an anonymous cart", async () => {
    await hybrisOCCDS.createCart(anonymous, token);
    expect(mocks.post).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${anonymous}/carts`,
      {
        params: {
          fields: "DEFAULT",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
  it("properly issues a call to create a user cart", async () => {
    await hybrisOCCDS.createCart(userEmail, token);
    expect(mocks.post).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${userEmail}/carts`,
      {
        params: {
          fields: "DEFAULT",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
});

describe("[HybrisAPI.mergeCart]", () => {
  it("properly issues a call to merge an anonymous cart with a user's cart", async () => {
    await hybrisOCCDS.mergeCart(
      userEmail,
      token,
      loggedInCartGuid,
      anonymousCartGuid
    );

    expect(mocks.post).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${userEmail}/carts?oldCartId=${anonymousCartGuid}&toMergeCartGuid=${loggedInCartGuid}`,
      {
        params: {
          fields: "DEFAULT",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
});

describe("[HybrisAPI.addProductToCart]", () => {
  it("properly issues a post as a logged in user to add a product to a cart", async () => {
    await hybrisOCCDS.addProductToCart(
      userEmail,
      loggedInCartCode,
      token,
      product
    );
    expect(mocks.post).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${userEmail}/carts/${loggedInCartCode}/entries`,
      {
        body: JSON.stringify({ product }),
        params: {
          fields: "DEFAULT",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });

  it("properly issues a post as an anonymous user to add a product to a cart", async () => {
    await hybrisOCCDS.addProductToCart(
      anonymous,
      anonymousCartGuid,
      token,
      product
    );
    expect(mocks.post).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${anonymous}/carts/${anonymousCartGuid}/entries`,
      {
        body: JSON.stringify({ product }),
        params: {
          fields: "DEFAULT",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
});

describe("[HybrisAPI.updateQuantity]", () => {
  it("properly issues put request to Hybris to update an entry", async () => {
    await hybrisOCCDS.updateQuantity(
      userEmail,
      loggedInCartCode,
      token,
      quantity,
      entryNumber
    );
    expect(mocks.put).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${userEmail}/carts/${loggedInCartCode}/entries/${entryNumber}`,
      {
        body: JSON.stringify({
          quantity,
        }),
        params: {
          fields: "DEFAULT",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
});
describe("[HybrisAPI.productStockDetails]", () => {
  it("properly issues a get request for a product's stock details", async () => {
    await hybrisOCCDS.productStockDetails(code);
    expect(mocks.get).toBeCalledWith(
      `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/products/${code}`,
      {
        params: {
          fields: "BASIC",
        },
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
});
describe("[HybrisAPI.emailSubscription]", () => {
  it("properly issues a get request to susbcribe a users's email", async () => {
    const tokenData = new URLSearchParams();
    tokenData.append("userId", userEmail);
    await hybrisOCCDS.emailSubscription(userEmail, token);
    expect(mocks.post).toBeCalledWith(
      `/restv2/v2/${
        process.env.HYBRIS_BASE_SITE_IDENTIFIER
      }/emailSubscription?${tokenData.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
  });
});
