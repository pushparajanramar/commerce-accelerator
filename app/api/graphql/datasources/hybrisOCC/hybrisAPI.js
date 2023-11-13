import { RESTDataSource } from "@apollo/datasource-rest";
import configuration from "../../../../../constants/configuration";

class HybrisAPI extends RESTDataSource {
  baseURL = process.env.HYBRIS_API_URL;
  async productDetails(pid) {
    try {
      const productDetailsResponse = this.get(
        `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/products/${pid}`,
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
      return productDetailsResponse;
    } catch (ex) {
      throw ex;
    }
  }
  async breadcrumbDetails(categoryId) {
    try {
      const breadcrumbs = this.get(
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
      return breadcrumbs;
    } catch (ex) {
      throw ex;
    }
  }
  async categoryFacets(categoryId) {
    try {
      const categoryFacets = this.get(
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
      return categoryFacets;
    } catch (ex) {
      throw ex;
    }
  }
  async hybrisClientToken() {
    try {
      const tokenData = new URLSearchParams();
      tokenData.append("client_id", process.env.HYBRIS_CLIENT_ID);
      tokenData.append("client_secret", process.env.HYBRIS_CLIENT_SECRET);
      tokenData.append("grant_type", "client_credentials");

      const clientToken = this.post(
        `/authorizationserver/oauth/token?${tokenData.toString()}`,
        {
          grant_type: "client_credentials",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return clientToken;
    } catch (ex) {
      throw ex;
    }
  }
  async createCart(user, token) {
    try {
      const createdCart = this.post(
        `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${user}/carts`,
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
      return createdCart;
    } catch (ex) {
      throw ex;
    }
  }
  async mergeCart(user, token, loggedInCartGuid, anonymousCartGuid) {
    try {
      const tokenData = new URLSearchParams();
      tokenData.append("oldCartId", anonymousCartGuid);
      tokenData.append("toMergeCartGuid", loggedInCartGuid);
      const mergedCart = await this.post(
        `/restv2/v2/${
          process.env.HYBRIS_BASE_SITE_IDENTIFIER
        }/users/${user}/carts?${tokenData.toString()}`,
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
      return mergedCart;
    } catch (ex) {
      throw ex;
    }
  }
  async carts(user, token) {
    try {
      const carts = await this.get(
        `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${user}/carts`,
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
      return carts;
    } catch (ex) {
      throw ex;
    }
  }
  async cart(user, cartCode, token) {
    try {
      const cart = await this.get(
        `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${user}/carts/${cartCode}`,
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
      return cart;
    } catch (ex) {
      throw ex;
    }
  }
  async addProductToCart(user, cartCode, token, product) {
    try {
      const updatedCart = await this.post(
        `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${user}/carts/${cartCode}/entries`,
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
      return updatedCart;
    } catch (ex) {
      throw ex;
    }
  }
  async cartEntries(user, cartCode, token) {
    try {
      const entries = await this.get(
        `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${user}/carts/${cartCode}/entries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      return entries;
    } catch (ex) {
      throw ex;
    }
  }
  async updateQuantity(user, cartCode, token, quantity, entryNumber) {
    try {
      const updatedEntry = await this.put(
        `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/users/${user}/carts/${cartCode}/entries/${entryNumber}`,
        {
          body: JSON.stringify({ quantity }),
          params: {
            fields: "DEFAULT",
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      return updatedEntry;
    } catch (ex) {
      throw ex;
    }
  }
  /*
        CDC is not yet configured to allow for communication with Hybris
    */
  async CDCClientToken(UID, UIDSignature, timeStamp, idToken) {
    try {
      const tokenData = new URLSearchParams();
      tokenData.append("client_id", "trusted_client");
      tokenData.append("client_secret", "secret");
      tokenData.append("grant_type", "custom");
      tokenData.append("scope", "extended");
      tokenData.append("UID", UID);
      tokenData.append("UIDSignature", UIDSignature);
      tokenData.append("timeStamp", timeStamp);
      tokenData.append("idToken", idToken);
      tokenData.append("baseSite", process.env.HYBRIS_BASE_SITE_IDENTIFIER);

      const clientToken = this.post(
        `/authorizationserver/oauth/token?&${tokenData.toString()}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return clientToken;
    } catch (ex) {
      throw ex;
    }
  }

  async productStockDetails(pid) {
    try {
      const productDetailsResponse = this.get(
        `/restv2/v2/${process.env.HYBRIS_BASE_SITE_IDENTIFIER}/products/${pid}`,
        {
          params: {
            fields: "BASIC",
          },
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      return productDetailsResponse;
    } catch (ex) {
      throw ex;
    }
  }

  async emailSubscription(email, token) {
    try {
      const tokenData = new URLSearchParams();
      tokenData.append("userId", email);
      const emailSubscriptionResponse = this.post(
        `/restv2/v2/${
          process.env.HYBRIS_BASE_SITE_IDENTIFIER
        }/emailSubscription?${tokenData.toString()}`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return emailSubscriptionResponse;
    } catch (ex) {
      throw ex;
    }
  }
}

export default HybrisAPI;
