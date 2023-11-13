import {
  makeProductResponse,
  makeBreadcrumbResponse,
  makeCategoryFacetsResponse,
  makeProductStockResponse,
} from "../../../../../adapters/APIData/providers/HybrisOCC/SchemaMapper";

export const resolvers = {
  Query: {
    __resolveType(obj, contextValue, info) {
      if (obj.sizeAndFitDescription) {
        return "HybrisProduct";
      } else {
        return "BloomreachProduct";
      }
    },
    productDetails: async (parent, { pid }, { dataSources }, info) => {
      try {
        const productDetailsResponse =
          await dataSources.hybrisAPI.productDetails(pid);
        const mappedProductDetailsResponse = await makeProductResponse(
          productDetailsResponse
        );
        return {
          status: 200,
          response: mappedProductDetailsResponse,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `productDetails resolver failed { name :${name}; message: ${message} }`;
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
    breadcrumbDetails: async (
      parent,
      { categoryId },
      { dataSources },
      info
    ) => {
      try {
        const breadcrumbDetailsResponse =
          await dataSources.hybrisAPI.breadcrumbDetails(categoryId);
        const mappedBreadcrumbDetailsResponse = await makeBreadcrumbResponse(
          breadcrumbDetailsResponse
        );
        return {
          status: 200,
          response: mappedBreadcrumbDetailsResponse,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `breadcrumbDetails resolver failed { name :${name}; message: ${message} }`;
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
    categoryFacets: async (parent, { categoryId }, { dataSources }, info) => {
      try {
        const categoryFacetsResponse =
          await dataSources.hybrisAPI.categoryFacets(categoryId);
        const mappedCategoryFacetsResponse = await makeCategoryFacetsResponse(
          categoryFacetsResponse
        );
        return {
          status: 200,
          response: mappedCategoryFacetsResponse,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `categoryFacets resolver failed { name :${name}; message: ${message} }`;
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
    carts: async (parent, { cartsParams }, { dataSources }, info) => {
      try {
        const { user, token } = cartsParams;
        const carts = await dataSources.hybrisAPI.carts(user, token);
        return {
          status: 200,
          response: carts,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `carts resolver failed { name :${name}; message: ${message} }`;
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
    cart: async (parent, { cartParams }, { dataSources }, info) => {
      try {
        const { user, cartCode, token } = cartParams;
        const cart = await dataSources.hybrisAPI.cart(user, cartCode, token);
        return {
          status: 200,
          response: cart,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        return {
          status: 400,
          response: null,
          errorMsg: `cart resolver failed { name :${name}; message: ${message} }`,
        };
      }
    },
    cartEntries: async (parent, { cartParams }, { dataSources }, info) => {
      try {
        const { user, token, cartCode } = cartParams;
        const entries = await dataSources.hybrisAPI.cartEntries(
          user,
          cartCode,
          token
        );
        return {
          status: 200,
          response: entries,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `cartEntries resolver failed { name :${name}; message: ${message} }`;
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
    productStockDetails: async (parent, { pid }, { dataSources }, info) => {
      try {
        const productStockDetailsResponse =
          await dataSources.hybrisAPI.productStockDetails(pid);
        const mappedProductStockDetailsResponse =
          await makeProductStockResponse(productStockDetailsResponse);
        return {
          status: 200,
          response: mappedProductStockDetailsResponse,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `productStockDetails resolver failed { name :${name}; message: ${message} }`;
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
  Mutation: {
    createHybrisClientToken: async (parent, args, { dataSources }, info) => {
      try {
        const hybrisToken = await dataSources.hybrisAPI.hybrisClientToken();
        return {
          status: 200,
          response: hybrisToken,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `createHybrisClientToken resolver failed { name :${name}; message: ${message} }`;
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
    createCart: async (parent, { createCartParams }, { dataSources }, info) => {
      try {
        const { user, token } = createCartParams;
        const cart = await dataSources.hybrisAPI.createCart(user, token);
        return {
          status: 200,
          response: cart,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `createCart resolver failed { name :${name}; message: ${message} }`;
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
    mergeCart: async (parent, { mergeCartParams }, { dataSources }, info) => {
      try {
        const { user, token, loggedInCartGuid, anonymousCartGuid } =
          mergeCartParams;
        const mergedCart = await dataSources.hybrisAPI.mergeCart(
          user,
          token,
          loggedInCartGuid,
          anonymousCartGuid
        );
        return {
          status: 200,
          response: mergedCart,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `mergeCart resolver failed { name :${name}; message: ${message} }`;
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
    addProductToCart: async (
      parent,
      { addProductParams },
      { dataSources },
      info
    ) => {
      try {
        const { user, cartCode, token, product } = addProductParams;
        const updatedCartEntry = await dataSources.hybrisAPI.addProductToCart(
          user,
          cartCode,
          token,
          product
        );
        return {
          status: 200,
          response: updatedCartEntry,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `addProductToCart resolver failed { name :${name}; message: ${message} }`;
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
    updateQuantity: async (
      parent,
      { updateQuantityParams },
      { dataSources },
      info
    ) => {
      try {
        const { user, cartCode, token, quantity, entryNumber } =
          updateQuantityParams;
        const cartEntry = await dataSources.hybrisAPI.updateQuantity(
          user,
          cartCode,
          token,
          quantity,
          entryNumber
        );
        return {
          status: 200,
          response: cartEntry,
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `updateQuantity resolver failed { name :${name}; message: ${message} }`;
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
    createCDCClientToken: async (
      parent,
      { CDCTokenParams },
      { dataSources },
      info
    ) => {
      try {
        const { UID, UIDSignature, timeStamp, idToken } = CDCTokenParams;
        const token = await dataSources.hybrisAPI.CDCClientToken(
          UID,
          UIDSignature,
          timeStamp,
          idToken
        );
        // console.group('********HybrisOCC resolvers -> createCDCClientToken ');
        // console.log('token: ', JSON.stringify(token, null, 2))
        // console.groupEnd();
        return "CDC Client Token Successful";
      } catch ({ name, message }) {
        const errorMsg = `createCDCClientToken resolver failed { name :${name}; message: ${message} }`;
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
    emailSubscription: async (
      parent,
      { emailSubscriptionParams },
      { dataSources },
      info
    ) => {
      try {
        const { email, token } = emailSubscriptionParams;
        const emailSubscriptionResponse =
          await dataSources.hybrisAPI.emailSubscription(email, token);
        return {
          status: 200,
          response: "",
          errorMsg: null,
        };
      } catch ({ name, message }) {
        const errorMsg = `emailSubscription resolver failed { name :${name}; message: ${message} }`;
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
