import fetchTags from "../../../../constants/fetchTags";
import {
  makeBreadcrumbResponse,
  makeProductResponse,
  makeCategoryFacetsResponse,
  makeProductStockResponse,
} from "./SchemaMapper";

import configuration from "../../../../constants/configuration";
import errorMsg from "../../../../constants/errorMsg";

export default class HybrisOCC {
  constructor() {
    this.config = this.getConfig();
  }

  getConfig() {
    return {
      clientId: process.env.HYBRIS_CLIENT_ID,
      clientSecret: process.env.HYBRIS_CLIENT_SECRET,
      apiUrl: process.env.HYBRIS_API_URL,
      baseSite: process.env.HYBRIS_BASE_SITE_IDENTIFIER,
    };
  }

  getProductDetails = async ({ pid }) => {
    const config = this.config;
    try {
      const response = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/products/${pid}?fields=FULL`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "GET",
          next: {
            revalidate: configuration.PDPProductCacheTime,
            tags: [fetchTags.fetchProductDetails],
          },
        }
      ).then((res) => res.json());
      const _response = await makeProductResponse(response);
      return {
        status: response.errors ? 400 : 200,
        response: _response,
      };
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  createGuestToken = async () => {
    const config = this.config;
    const tokenData = new URLSearchParams();
    tokenData.append("client_id", config.clientId);
    tokenData.append("client_secret", config.clientSecret);
    tokenData.append("grant_type", "client_credentials");

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        grant_type: "client_credentials",
      },
      grant_type: "client_credentials",
      body: tokenData.toString(),
    };
    try {
      const res = await fetch(
        `${config.apiUrl}/authorizationserver/oauth/token`,
        fetchOptions
      );
      const tokenResponse = await res.json();
      return {
        status: tokenResponse.error ? 400 : 200,
        response: tokenResponse,
      };
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  createCart = async ({ user, token }) => {
    const config = this.config;
    try {
      const cartResponse = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/users/${user}/carts?fields=BASIC`,
        {
          headers: {
            Authorization: token ? "Bearer " + token : undefined,
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "POST",
        }
      ).then((res) => res.json()); ///fetch user cart
      return {
        status: 200,
        response: cartResponse,
      };
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  mergeCart = async (user, token, oldCartId, toMergeCartGuid) => {
    const config = this.config;
    try {
      const cartResponse = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/users/${user}/carts?fields=DEFAULT`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body: JSON.stringify({
            oldCartId, //Anonymous cart GUID.
            toMergeCartGuid, //The GUID of the user's cart
          }),
        }
      ).then((res) => res.json()); ///fetch user cart
      if (cartResponse.errors) {
        return {
          status: 404,
          response: cartResponse,
        };
      } else {
        return {
          status: 200,
          response: cartResponse,
        };
      }
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  retrieveCart = async (user, token) => {
    const config = this.config;
    try {
      const response = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/users/${user}/carts?fields=DEFAULT`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "GET",
        }
      ).then((res) => res.json());

      if (response.errors) {
        return {
          status: 404,
          response: response,
        };
      } else {
        return {
          status: 200,
          response: response,
        };
      }
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  retrieveCartWithIdentifier = async ({ user, cartId, token }) => {
    
    const config = this.config;
    try {
      const response = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/users/${user}/carts/${cartId}?fields=DEFAULT`,
        {
          headers: {
            Authorization: token ? "Bearer " + token : undefined,
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "GET",
        }
      ).then((res) => res.json());
      if (response.errors) {
        return {
          status: 404,
          response: response,
        };
      } else {
        return {
          status: 200,
          response: response,
        };
      }
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  getProductStockDetails = async ({ pid }) => {
    const config = this.config;
    try {
      const response = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/products/${pid}?fields=BASIC`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "GET",
        }
      ).then((res) => res.json());
      const _response = await makeProductStockResponse(response);
      return {
        status: response.errors ? 400 : 200,
        response: _response,
      };
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || "Error in fetching",
      };
    }
  };
  AddProductToCart = async (data) => {
    const { user, token, guId, product, qty } = data;
    const config = this.config;
    try {
      const res = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/users/${user}/carts/${guId}/entries?code=${product}&qty=${qty}`,
        {
          headers: {
            Authorization: token ? "Bearer " + token : undefined,
          },
          method: "POST",
          //   body: JSON.stringify({ code: product }),
        }
      ).then((res) => res.json());
      if (res.errors) {
        return {
          status: 400,
          errorMsg:
            res?.errors[0]?.type === "InsufficientStockError"
              ? errorMsg.productCannotShipped
              : errorMsg.tryAgainLater,
          response: res,
        };
      } else {
        return {
          status: 200,
          response: res,
        };
      }
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  UpdateProductQtyToCart = async ({
    user,
    cardId,
    token,
    product,
    entryNumber,
  }) => {
    const config = this.config;

    try {
      const res = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/users/${user}/carts/${cardId}/entries/${entryNumber}?fields=DEFAULT`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "PATCH",
          body: JSON.stringify(product),
        }
      ).then((res) => res.json());
      if (res.errors) {
        return {
          status: 400,
          errorMsg:
            res?.errors[0]?.type === "InsufficientStockError"
              ? errorMsg.productCannotShipped
              : errorMsg.tryAgainLater,
          response: res,
        };
      } else {
        return {
          status: 200,
          response: res,
        };
      }
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  getCartEntries = async ({ user, cardId, token }) => {
    const config = this.config;
    try {
      const response = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/users/${user}/carts/${cardId}/entries?fields=DEFAULT`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "GET",
        }
      ).then((res) => res.json());

      return {
        status: 200,
        response: response,
      };
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  UpdateProductQtyToCart = async ({
    user,
    cardId,
    token,
    product,
    entryNumber,
  }) => {
    const config = this.config;

    try {
      const res = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/users/${user}/carts/${cardId}/entries/${entryNumber}?fields=DEFAULT`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "PATCH",
          body: JSON.stringify(product),
        }
      ).then((res) => res.json());
      if (res.errors) {
        return {
          status: 400,
          errorMsg:
            res?.errors[0]?.type === "InsufficientStockError"
              ? errorMsg.productCannotShipped
              : errorMsg.tryAgainLater,
          response: res,
        };
      } else {
        return {
          status: 200,
          response: res,
        };
      }
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  fetchBreadcrumbDetail = async ({ categoryId }) => {
    const config = this.config;
    try {
      const response = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/catalogs/categories/${categoryId}?fields=FULL`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "GET",
          next: {
            revalidate: configuration.PDPProductCacheTime,
            tags: [fetchTags.fetchProductDetails],
          },
        }
      ).then((res) => res.json());
      const _response = await makeBreadcrumbResponse(response);
      return {
        status: 200,
        response: _response,
      };
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  createUserToken = async ({ UID, UIDSignature, timeStamp, idToken }) => {
    const config = this.config;
    const tokenData = new URLSearchParams();
    tokenData.append("client_id", "trusted_client");
    tokenData.append("client_secret", "secret");
    tokenData.append("grant_type", "custom");
    tokenData.append("scope", "extended");
    tokenData.append("UID", UID);
    tokenData.append("UIDSignature", UIDSignature);
    tokenData.append("timeStamp", timeStamp);
    tokenData.append("idToken", idToken);
    tokenData.append("baseSite", config.baseSite);

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: tokenData.toString(),
    };
    try {
      const tokenResponse = await fetch(
        `${config.apiUrl}/authorizationserver/oauth/token`,
        fetchOptions
      ).then((res) => res.json());

      return {
        status: tokenResponse?.error ? 400 : 200,
        response: tokenResponse,
      };
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  fetchCategoryFacets = async ({ categoryid }) => {
    const config = this.config;
    try {
      const response = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/catalogs/masterProductCatalog/Online/categories/${categoryid}`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "GET",
          next: {
            revalidate: configuration.CategoryFacetCacheTime,
            tags: [fetchTags.fetchCategoryFacets],
          },
        }
      ).then((res) => res.json());
      const _response = await makeCategoryFacetsResponse(response);
      return {
        status: response.errors ? 400 : 200,
        response: _response,
      };
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || errorMsg.errorInFetch,
      };
    }
  };

  emailSubscription = async ({ email, token }) => {
    const config = this.config;
    try {
      const response = await fetch(
        `${config.apiUrl}/restv2/v2/${config.baseSite}/emailSubscription?userId=${email}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "POST",
          cache: "no-store",
        }
      );
      return {
        status: response.status ? response.status : 400,
        response: {},
      };
    } catch (ex) {
      return {
        status: 400,
        response: ex.message || "Error in fetching",
      };
    }
  };
}
