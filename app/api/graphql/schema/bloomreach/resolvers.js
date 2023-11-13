import {
  makeAutoSuggestResponse,
  makePLPProductResponse,
  makeRelatedAllResponse,
} from "../../../../../adapters/APIData/providers/BloomReach/SchemaMapper";

export const resolvers = {
  Query: {
    autoSuggestions: async (
      parent,
      { suggestionSource },
      { dataSources },
      info
    ) => {
      try {
        const fetchedAutoSuggestionsResponse =
          await dataSources.bloomreachSuggestAPI.autoSuggestions(
            suggestionSource
          );
        const mappedAutoSuggestionsResponse = await makeAutoSuggestResponse(
          fetchedAutoSuggestionsResponse
        );
        return {
          status: 200,
          response: mappedAutoSuggestionsResponse,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `autoSuggestions resolver failed { name :${name}; message: ${message} }`;
        if (process.env.NEXT_PUBLIC_APP_BASE_URL.includes("localhost")) {
          console.group(`\n !!! ERROR !!!`);
          console.log(errorMsg);
          console.log("\n");
          console.groupEnd();
        }
        return {
          status: 400,
          response: null,
          errorMsg,
        };
      }
    },
    autoSuggestProduct: async (
      parent,
      { suggestionParams },
      { dataSources },
      info
    ) => {
      try {
        const { productId, sort, start, limit, filters } = suggestionParams;
        const fetchedAutoSuggestProductResponse =
          await dataSources.bloomreachCoreAPI.autoSuggestionByProduct(
            productId,
            filters,
            sort,
            start,
            limit
          );
        const plpAutoSuggestProductResponse = await makePLPProductResponse(
          fetchedAutoSuggestProductResponse
        );

        return {
          status: 200,
          response: plpAutoSuggestProductResponse,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `autoSuggestProduct resolver failed { name :${name}; message: ${message} }`;
        if (process.env.NEXT_PUBLIC_APP_BASE_URL.includes("localhost")) {
          console.group(`\n !!! ERROR !!!`);
          console.log(errorMsg);
          console.log("\n");
          console.groupEnd();
        }
        return {
          status: 400,
          response: null,
          errorMsg,
        };
      }
    },
    categoryBasedProducts: async (
      parent,
      { categoryBasedProductParams },
      { dataSources },
      info
    ) => {
      try {
        const { categoryId, sort, start, limit, filters } =
          categoryBasedProductParams;
        const fetchedCategoryBasedProductResponse =
          await dataSources.bloomreachCoreAPI.productsFromCategory(
            categoryId,
            filters,
            sort,
            start,
            limit
          );
        const plpCategoryBasedProductResponse = await makePLPProductResponse(
          fetchedCategoryBasedProductResponse
        );
        return {
          status: 200,
          response: plpCategoryBasedProductResponse,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `categoryBasedProducts resolver failed { name :${name}; message: ${message} }`;
        if (process.env.NEXT_PUBLIC_APP_BASE_URL.includes("localhost")) {
          console.group(`\n !!! ERROR !!!`);
          console.log(errorMsg);
          console.log("\n");
          console.groupEnd();
        }
        return {
          status: 400,
          response: null,
          errorMsg,
        };
      }
    },
    similarItems: async (
      parent,
      { similarItemsParams },
      { dataSources },
      info
    ) => {
      try {
        const { items, limit, start } = similarItemsParams;
        const fetchedSimilarItems =
          await dataSources.bloomreachPathwaysAPI.similarItems(
            items,
            limit,
            start
          );
        const plpSimilarItemsResponse = await makePLPProductResponse(
          fetchedSimilarItems
        );
        return {
          status: 200,
          response: plpSimilarItemsResponse,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `similarItems resolver failed { name :${name}; message: ${message} }`;
        if (process.env.NEXT_PUBLIC_APP_BASE_URL.includes("localhost")) {
          console.group(`\n !!! ERROR !!!`);
          console.log(errorMsg);
          console.log("\n");
          console.groupEnd();
        }
        return {
          status: 400,
          response: null,
          errorMsg,
        };
      }
    },
    relatedItemsCategoriesProducts: async (
      parent,
      { productURL },
      { dataSources },
      info
    ) => {
      try {
        const fetchedRelatedProducts =
          await dataSources.bloomreachRelatedAPI.relatedItemsCategoriesProducts(
            productURL
          );
        const relatedAllResponse = await makeRelatedAllResponse(
          fetchedRelatedProducts
        );
        return {
          status: 200,
          ...relatedAllResponse,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `relatedItemsCategoriesProducts resolver failed { name :${name}; message: ${message} }`;
        if (process.env.NEXT_PUBLIC_APP_BASE_URL.includes("localhost")) {
          console.group(`\n !!! ERROR !!!`);
          console.log(errorMsg);
          console.log("\n");
          console.groupEnd();
        }
        return {
          status: 400,
          response: null,
          errorMsg,
        };
      }
    },
    productCarouselDetails: async (
      parent,
      { productIds },
      { dataSources },
      info
    ) => {
      try {
        if (productIds.length) {
          const products = await Promise.all(
            productIds.map(async (productId) => {
              const autoSuggestedProductResponse =
                await dataSources.bloomreachCoreAPI.autoSuggestionByProduct(
                  productId,
                  "", //filters
                  undefined, //sort
                  0,
                  1
                );
              const autoSuggestedProductObj = await makePLPProductResponse(
                autoSuggestedProductResponse
              );
              const { docs } = autoSuggestedProductObj;
              return docs[0];
            })
          );
          return {
            status: 200,
            response: products,
            errorMsg: null,
          };
        }
        const errorMsg = "No productIds supplied";
        if (process.env.NEXT_PUBLIC_APP_BASE_URL.includes("localhost")) {
          console.group(`\n !!! ERROR !!!`);
          console.log(errorMsg);
          console.log("\n");
          console.groupEnd();
        }
        return {
          status: 400,
          response: null,
          errorMsg,
        };
      } catch ({ name, message }) {
        const errorMsg = `productCarouselDetails resolver failed { name :${name}; message: ${message} }`;
        if (process.env.NEXT_PUBLIC_APP_BASE_URL.includes("localhost")) {
          console.group(`\n !!! ERROR !!!`);
          console.log(errorMsg);
          console.log("\n");
          console.groupEnd();
        }
        return {
          status: 400,
          response: null,
          errorMsg,
        };
      }
    },
  },
};
