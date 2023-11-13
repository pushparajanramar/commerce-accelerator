import fetchTags from "../constants/fetchTags";
import configuration from "../constants/configuration";
import route from "../constants/route";
import Cookies from "js-cookie";

let autoSuggestController = new AbortController();
let productsBasedOnKeywordController = new AbortController();
let productCarousalController = new AbortController();
let authTokenController = new AbortController();
let guestTokenController = new AbortController();
let retrieveCartController = new AbortController();

export const getConfig = () => {
  return {
    enableMock: process.env.NEXT_PUBLIC_APP_ENABLE_MOCK,
    baseUrl: process.env.SITE_URL
      ? process.env.SITE_URL
      : process.env.NEXT_PUBLIC_APP_BASE_URL,
  };
};
// For frontend api request

//Auto Suggest
export const getAutoSuggestResult = async (query) => {
  autoSuggestController?.abort();
  autoSuggestController = new AbortController();
  const revalidateTime =
    getConfig().enableMock === "true" ? 0 : configuration.autoSuggestCacheTime;
  try {
    const response = await fetch(route.api.autosuggestion + "?q=" + query, {
      // cache: 'no-store',
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query }),
      signal: autoSuggestController.signal,
      next: {
        revalidate: revalidateTime,
        tags: [fetchTags.getAutoSuggestResult],
      },
    }).then((res) => res.json());

    return response;
  } catch (ex) {
    return {
      status: 400,
      response: ex.message || "Error in fetching",
    };
  }
};
//Search
export const getProductsBasedOnKeyword = async ({
  query,
  limit,
  start,
  filter = {},
  sort = null,
}) => {
  productsBasedOnKeywordController?.abort();
  productsBasedOnKeywordController = new AbortController();
  const revalidateTime =
    getConfig().enableMock === "true"
      ? 0
      : configuration.autoSuggestProductCacheTime;
  try {
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(baseUrl + route.api.autosuggestionProducts, {
      // cache: 'no-store',
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query, limit, start, filter, sort }),
      signal: productsBasedOnKeywordController.signal,
      next: {
        revalidate: revalidateTime,
        tags: [fetchTags.getProductsBasedOnKeyword],
      },
    }).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};
export const getConfigOfProductsBasedOnKeywordResponse = async (
  productResponse,
  limit,
  categoryFacets = []
) => {
  const status = productResponse.status;
  if (status === 200) {
    const response = productResponse?.response;
    const facets = response?.facets;
    if (categoryFacets && categoryFacets.length > 0) {
      facets["categories"] = categoryFacets;
    }

    const results = response?.docs || [];
    const numFound = response?.total || 0;
    const startPage = response.start
      ? response.start <= 0
        ? 1
        : response.start / limit
      : 0;
    const showingProduct = response.start + limit;
    const showing = showingProduct >= numFound ? numFound : showingProduct;
    return { results, numFound, startPage, showing, status, facets };
  } else {
    const facets = {};
    if (categoryFacets && categoryFacets.length > 0) {
      facets["categories"] = categoryFacets;
    }
    return {
      results: [],
      numFound: 0,
      startPage: 0,
      showing: 0,
      status,
      facets,
    };
  }
};
//PLP
export const getProductsBasedOnCategoryId = async ({
  categoryid,
  limit,
  start,
  filter = {},
  sort = null,
}) => {
  productsBasedOnKeywordController?.abort();
  productsBasedOnKeywordController = new AbortController();

  const revalidateTime =
    getConfig().enableMock === "true" ? 0 : configuration.PLPProductCacheTime;

  try {
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(baseUrl + route.api.categoryBasedProducts, {
      // cache: 'no-store',
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ categoryid, limit, start, filter, sort }),
      signal: productsBasedOnKeywordController.signal,
      next: {
        revalidate: revalidateTime,
        tags: [fetchTags.getProductsBasedOnCategoryId],
      },
    }).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};

//Product details
export const fetchProductDetails = async (pid) => {
  const revalidateTime =
    getConfig().enableMock === "true" ? 0 : configuration.PDPProductCacheTime;
  try {
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(
      baseUrl + route.api.productDetail + "/" + pid,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        // signal: productsBasedOnKeywordController.signal,
        next: {
          revalidate: revalidateTime,
          tags: [fetchTags.fetchProductDetails],
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};

//Page information
export const getPageInformation = async ({ pageName, pageData = {} }) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ pageName, pageData }),
    }
    if (pageData.searchParams && pageData.searchParams.live_preview) {
      options['cache'] = 'no-store'
    } else {
      options['next'] = {
        revalidate: configuration.PageInformationCacheTime,
        tags: [fetchTags.getPageInformation],
      }
    }
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(`${baseUrl + route.api.pageInformation}`,
      { ...options })
      .then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      // error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};
//Page breadcrumb
export const getPageBreadcrumb = async ({ pagename, pagedata = {} }) => {
  try {
    const revalidateTime =
      getConfig().enableMock === "true"
        ? 0
        : configuration.PageInformationCacheTime;
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(`${baseUrl + route.api.breadcrumb}`, {
      // cache: 'no-store',
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ pagename, pagedata }),
      next: { revalidate: revalidateTime, tags: [fetchTags.getPageBreadcrumb] },
    }).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      // error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};
//Auth Token
export const getAuthToken = async ({
  UID,
  UIDSignature,
  timeStamp,
  idToken,
}) => {
  try {
    authTokenController?.abort();
    authTokenController = new AbortController();

    const baseUrl = getConfig().baseUrl;
    const response = await fetch(`${baseUrl + route.api.authToken}`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        UID,
        UIDSignature,
        timeStamp,
        idToken,
      }),
      signal: authTokenController.signal,
    }).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      // error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};
// Size Chart Information from ContentStack
export const getChartInformation = async () => {
  try {
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(
      `${baseUrl + route.api.sizeChartInformation}`,
      {
        // cache: 'no-store',
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        next: {
          revalidate: configuration.PageInformationCacheTime,
          tags: [fetchTags.getPageInformation],
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      // error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};

//Home Page Product Carousel
export const getHomePageProductCarousel = async ({ productIds }) => {
  productCarousalController?.abort();
  productCarousalController = new AbortController();
  try {
    // const revalidateTime =
    //   getConfig().enableMock === "true"
    //     ? 0
    //     : configuration.ProductCarouselCacheTime;
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(`${baseUrl + route.api.productCarousel}`, {
      cache: 'no-store',
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ productIds }),
      signal: productCarousalController.signal,
      // next: {
      //   revalidate: revalidateTime,
      //   tags: [fetchTags.fetchProductCarousel],
      // },
    }).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      // error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};
//PLP Page Category Facets
export const getCategoryFacets = async ({ categoryid }) => {
  try {
    const revalidateTime =
      getConfig().enableMock === "true"
        ? 0
        : configuration.CategoryFacetCacheTime;
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(`${baseUrl + route.api.categoryFacets}`, {
      // cache: 'no-store',
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ categoryid }),
      next: {
        revalidate: revalidateTime,
        tags: [fetchTags.fetchCategoryFacets],
      },
    }).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      // error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};

//fetch related items
export const getFetchRelatedItems = async ({ producturl }) => {
  try {
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(`${baseUrl + route.api.relatedAllItems}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        producturl,
      }),
      next: {
        revalidate: configuration.relatedAllItemsCacheTime,
        tags: [fetchTags.fetchRelatedItemsCategoryProducts],
      },
    }).then((res) => res.json());

    return response;
  } catch (ex) {
    return {
      status: 400,
      response: ex.message || "Error in fetching",
    };
  }
};

//Page globals data
export const getGlobalEntry = async ({ isPreviewMode = false }) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    }
    if (isPreviewMode) {
      options['cache'] = 'no-store'
    } else {
      options['next'] = {
        revalidate: configuration.PageGlobalData,
        tags: [fetchTags.getPageGlobalInformation],
      }
    }
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(
      `${baseUrl + route.api.pageGlobalInformation}`,
      { ...options }
    ).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      response: ex.message || "Error in fetching",
    };
  }
};

//PDP Stock Status
export const getProductStock = async ({ productId }) => {
  try {
    const baseUrl = getConfig().baseUrl;
    const response = await fetch(
      `${baseUrl + route.api.productStock}/${productId}/stock`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      response: ex.message || "Error in fetching",
    };
  }
};
//Anonymous Token

export const getGuestToken = async () => {
  try {
    guestTokenController?.abort();
    guestTokenController = new AbortController();

    const baseUrl = getConfig().baseUrl;
    const response = await fetch(`${baseUrl + route.api.guestToken}`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      signal: guestTokenController.signal,
    }).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      // error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};

//getCart

export const createCart = async ({ user, bearerToken }) => {
  try {
    guestTokenController?.abort();
    guestTokenController = new AbortController();

    const baseUrl = getConfig().baseUrl;
    const response = await fetch(`${baseUrl + route.api.createCart}`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user,
        bearerToken,
      }),
      signal: guestTokenController.signal,
    }).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      // error: ex,
      response: ex.message || "Error in fetching",
    };
  }
};

// add product to cart

export const addToCart = async ({
  user,
  bearerToken,
  guid,
  productCode,
  qty = 1,
}) => {
  try {
    guestTokenController?.abort();
    guestTokenController = new AbortController();

    const baseUrl = getConfig().baseUrl;
    const response = await fetch(`${baseUrl + route.api.addProductToCart}`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user,
        bearerToken,
        guid,
        productCode,
        qty,
      }),
      signal: guestTokenController.signal,
    }).then((res) => res.json());
    return response;
  } catch (ex) { }
};



export async function createBearerToken() {
  const tokenData = localStorage && localStorage.hasOwnProperty(configuration.hybrisTokenCookieName) ? localStorage.getItem(configuration.hybrisTokenCookieName) : null;
  if (tokenData) {
    return tokenData?.toString()
  }

  const tokenResponse = await getGuestToken() // For Guest Token
  if (tokenResponse.status === 200 && tokenResponse.response && tokenResponse.response.access_token) {
    if (localStorage) {
      localStorage.setItem(configuration.hybrisTokenCookieName, tokenResponse.response.access_token)
    }
    return tokenResponse.response.access_token
  }
  throw new Error(errorMsg.failedToCreateToken)
}

//email subscription

export const createEmailSubscription = async ({ email }) => {
  try {
    const token = await createBearerToken()
    const baseUrl = getConfig().baseUrl;
    const res = await fetch(`${baseUrl + route.api.emailSubscription}`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        token,
      }),
      signal: guestTokenController.signal,
    });

    const response = await res.json();
    if (response.status === 200) {
      return response
    } else {
      const errorType = response?.response?.errors ? response?.response?.errors[0]?.type : null
      if (errorType === 'InvalidTokenError' || response?.status === 401) {
        if (localStorage && localStorage.hasOwnProperty(configuration.hybrisTokenCookieName)) {
          localStorage.removeItem(configuration.hybrisTokenCookieName)
        }
        return await createEmailSubscription({ email })
      }
      return response
    }
  } catch (ex) {
    return ex
  }
};


//Landing Page data
export const getLandingPageEntry = async ({ isPreviewMode = false, pathname, searchParams }) => {
  try {
    const baseUrl = getConfig().baseUrl;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ pathname, isPreviewMode, searchParams }),
    }
    if (isPreviewMode) {
      options['cache'] = 'no-store'
    } else {
      options['next'] = {
        revalidate: configuration.landingPageData,
        tags: [fetchTags.getLandingPageInformation],
      }
    }
    const response = await fetch(
      `${baseUrl + route.api.landingPage}`,
      {
        ...options,
      }
    ).then((res) => res.json());
    return response;
  } catch (ex) {
    return {
      status: 400,
      response: ex.message || "Error in fetching",
    };
  }
};

//rerieve cart

export const retrieveCart = async ({ user, bearerToken, cartId }) => {
  try {
    retrieveCartController?.abort();
    retrieveCartController = new AbortController();

    const baseUrl = getConfig().baseUrl;
    const response = await fetch(`${baseUrl + route.api.retrieveCart}`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user,
        bearerToken,
        cartId
      }),
      signal: retrieveCartController.signal,
    }).then((res) => res.json());
    return response;
  } catch (ex) { }
};


