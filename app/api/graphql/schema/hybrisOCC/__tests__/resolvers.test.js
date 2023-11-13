import {
  mockedBreadcrumbDetailsResponse,
  mockedCategoryFacetsResponse,
  mockedProductDetailsResponse,
  mockedCartsResponse,
  mockedAnonymousCartResponse,
  mockedLoggedInCartResponse,
  mockedLoggedInCartEntriesResponse,
  mockedAnonymousCartEntriesResponse,
  mockedHybrisClientTokenResponse,
  mockedAnonymousCreateCartResponse,
  mockedLoggedInCreateCartResponse,
  mockedAnonymousAddProductToCartResponse,
  mockedLoggedInAddProductToCartResponse,
  mockedMergeCartResponse,
  mockedUpdateCartResponse,
  mockedProductStockDetailsResponse,
} from "../../../__mocks__/datasources/hybrisOCC";
import {
  mockedAnonymousAddProductToCartResolverResponse,
  mockedAnonymousCartEntriesResolverResponse,
  mockedAnonymousCartResolverResponse,
  mockedBreadcrumbDetailsResolverResponse,
  mockedCartsResolverResponse,
  mockedCategoryFacetsResolverResponse,
  mockedCreateCartAnonymousResolverResponse,
  mockedCreateCartLoggedInResolverResponse,
  mockedHybrisClientTokenResolverResponse,
  mockedLoggedInAddProductToCartResolverResponse,
  mockedLoggedInCartEntriesResolverResponse,
  mockedLoggedInCartResolverResponse,
  mockedMergeCartResolverResponse,
  mockedProductDetailsResolverResponse,
  mockedUpdateCartResolverResponse,
  mockedProductStockDetailsResolverResponse,
  mockedEmailSubscriptionResolverResponse,
} from "../../../__mocks__/resolvers/hybrissOCC";
import { resolvers } from "../resolvers";

const mockContext = {
  dataSources: {
    hybrisAPI: {
      productDetails: jest.fn(),
      breadcrumbDetails: jest.fn(),
      categoryFacets: jest.fn(),
      hybrisClientToken: jest.fn(),
      createCart: jest.fn(),
      mergeCart: jest.fn(),
      carts: jest.fn(),
      cart: jest.fn(),
      addProductToCart: jest.fn(),
      cartEntries: jest.fn(),
      updateQuantity: jest.fn(),
      productStockDetails: jest.fn(),
      emailSubscription: jest.fn(),
    },
  },
};

describe("[Hybris Query.productDetails]", () => {
  const { productDetails } = mockContext.dataSources.hybrisAPI;

  it("it returns the prodcut's detaisl given it's pid", async () => {
    productDetails.mockReturnValueOnce(mockedProductDetailsResponse);
    const res = await resolvers.Query.productDetails(
      null,
      {
        pid: "1MY348_9HGR_M",
      },
      mockContext
    );
    expect(res).toEqual(mockedProductDetailsResolverResponse);
  });
});

describe("[Hybris Query.breadcrumbDetails]", () => {
  const { breadcrumbDetails } = mockContext.dataSources.hybrisAPI;

  it("returns breadcrumb details given a categoryId", async () => {
    breadcrumbDetails.mockReturnValueOnce(mockedBreadcrumbDetailsResponse);
    const res = await resolvers.Query.breadcrumbDetails(
      null,
      {
        categoryId: "0133",
      },
      mockContext
    );
    expect(res).toEqual(mockedBreadcrumbDetailsResolverResponse);
  });
});

describe("[Hybris Query.categoryFacets]", () => {
  const { categoryFacets } = mockContext.dataSources.hybrisAPI;

  it("returns category facets given a categoryId", async () => {
    categoryFacets.mockReturnValueOnce(mockedCategoryFacetsResponse);
    const res = await resolvers.Query.categoryFacets(
      null,
      {
        categoryId: "0133",
      },
      mockContext
    );
    expect(res).toEqual(mockedCategoryFacetsResolverResponse);
  });
});

describe("[Hybris Query.carts]", () => {
  const { carts } = mockContext.dataSources.hybrisAPI;

  it("retruns a user's carts given the user's email", async () => {
    carts.mockReturnValueOnce(mockedCartsResponse);
    const res = await resolvers.Query.carts(
      null,
      {
        cartsParams: {
          token: "JX3levHigPPdwwlUNVqwsQJkofA",
          user: "kevins.ruiz@callawaygolf.com",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedCartsResolverResponse);
  });
});

describe("[Hybris Query.cart]", () => {
  const { cart } = mockContext.dataSources.hybrisAPI;

  it("return a logged in user's cart", async () => {
    cart.mockReturnValueOnce(mockedLoggedInCartResponse);
    const res = await resolvers.Query.cart(
      null,
      {
        cartParams: {
          token: "JX3levHigPPdwwlUNVqwsQJkofA",
          user: "dummy.email@callawaygolf.com",
          cartCode: "CART-50610967",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedLoggedInCartResolverResponse);
  });
  it("returns an anonymous user's cart given its cart guid", async () => {
    cart.mockReturnValueOnce(mockedAnonymousCartResponse);
    const res = await resolvers.Query.cart(
      null,
      {
        cartParams: {
          token: "JX3levHigPPdwwlUNVqwsQJkofA",
          user: "anonymous",
          cartCode: "ceff34c0-45fa-4ae0-b6be-dde5bce45211",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedAnonymousCartResolverResponse);
  });
});

describe("[Hybris Query.cartEntries]", () => {
  const { cartEntries } = mockContext.dataSources.hybrisAPI;

  it("return a logged in user's cart entries", async () => {
    cartEntries.mockReturnValueOnce(mockedLoggedInCartEntriesResponse);
    const res = await resolvers.Query.cartEntries(
      null,
      {
        cartParams: {
          token: "JX3levHigPPdwwlUNVqwsQJkofA",
          user: "dummy.email@callawaygolf.com",
          cartCode: "CART-50610967",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedLoggedInCartEntriesResolverResponse);
  });
  it("returns an anonymous user's cart entries given its cart guid", async () => {
    cartEntries.mockReturnValueOnce(mockedAnonymousCartEntriesResponse);
    const res = await resolvers.Query.cartEntries(
      null,
      {
        cartParams: {
          token: "JX3levHigPPdwwlUNVqwsQJkofA",
          user: "anonymous",
          cartCode: "ceff34c0-45fa-4ae0-b6be-dde5bce45211",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedAnonymousCartEntriesResolverResponse);
  });
});

describe("[Hybris Mutation.createHybrisClientToken]", () => {
  const { hybrisClientToken } = mockContext.dataSources.hybrisAPI;

  it("returns a hybris client token", async () => {
    hybrisClientToken.mockReturnValueOnce(mockedHybrisClientTokenResponse);
    const res = await resolvers.Mutation.createHybrisClientToken(
      null,
      null,
      mockContext
    );
    expect(res).toEqual(mockedHybrisClientTokenResolverResponse);
  });
});

describe("[Hybris Mutation.createCart]", () => {
  const { createCart } = mockContext.dataSources.hybrisAPI;
  it("returns a cart for an anonymous user", async () => {
    createCart.mockReturnValueOnce(mockedAnonymousCreateCartResponse);
    const res = await resolvers.Mutation.createCart(
      null,
      {
        createCartParams: {
          token: "JX3levHigPPdwwlUNVqwsQJkofA",
          user: "anonymous",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedCreateCartAnonymousResolverResponse);
  });
  it("returns a cart for an logged in user", async () => {
    createCart.mockReturnValueOnce(mockedLoggedInCreateCartResponse);
    const res = await resolvers.Mutation.createCart(
      null,
      {
        createCartParams: {
          token: "JX3levHigPPdwwlUNVqwsQJkofA",
          user: "dummy.email@callawaygolf.com",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedCreateCartLoggedInResolverResponse);
  });
});

describe("[Hybris Mutation.mergeCart]", () => {
  const { mergeCart } = mockContext.dataSources.hybrisAPI;

  it("returns a new cart with the entries of the anonymous and user cart merged", async () => {
    mergeCart.mockReturnValueOnce(mockedMergeCartResponse);
    const res = await resolvers.Mutation.mergeCart(
      null,
      {
        mergeCartParams: {
          anonymousCartGuid: "3f6cabf3-ad01-47df-8da5-a0c4ccc248bc",
          token: "JX3levHigPPdwwlUNVqwsQJkofA",
          user: "kevins.ruiz@callawaygolf.com",
          loggedInCartGuid: "abb87ce8-7cfb-4c34-8cd1-266af2efc42f",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedMergeCartResolverResponse);
  });
});

describe("[Hybris Mutation.addProductToCart]", () => {
  const { addProductToCart } = mockContext.dataSources.hybrisAPI;

  it("returns the entry of the product added to the anonymous cart", async () => {
    addProductToCart.mockReturnValueOnce(
      mockedAnonymousAddProductToCartResponse
    );
    const res = await resolvers.Mutation.addProductToCart(
      null,
      {
        addProductParams: {
          cartCode: "f2975ed8-0b63-445f-b2e8-f23d39712f53",
          product: {
            code: "1MY120_4HTM_M",
            quantity: 1,
          },
          token: "JX3levHigPPdwwlUNVqwsQJkofA",
          user: "anonymous",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedAnonymousAddProductToCartResolverResponse);
  });

  it("returns the entry of a product added to a logged in user cart", async () => {
    addProductToCart.mockReturnValueOnce(
      mockedLoggedInAddProductToCartResponse
    );
    const res = await resolvers.Mutation.addProductToCart(
      null,
      {
        addProductParams: {
          cartCode: "CART-50610967",
          product: {
            code: "1MY126_0HFI_M",
            quantity: 3,
          },
          token: "JX3levHigPPdwwlUNVqwsQJkofA",
          user: "kevins.ruiz@callawaygolf.com",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedLoggedInAddProductToCartResolverResponse);
  });
});

describe("[Hybris Mutation.updateQuantity]", () => {
  const { updateQuantity } = mockContext.dataSources.hybrisAPI;

  it("returns the cart entry of the product with the updated quantity", async () => {
    updateQuantity.mockReturnValueOnce(mockedUpdateCartResponse);

    const res = await resolvers.Mutation.updateQuantity(
      null,
      {
        updateQuantityParams: {
          cartCode: "CART-50611025",
          entryNumber: 2,
          quantity: 1,
          token: "c6PlLmJyM3_ZSAwqxS0JTRFIlso",
          user: "dummy.email@callawaygolf.com",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedUpdateCartResolverResponse);
  });
});

describe("[Hybris Query.productStockDetails]", () => {
  const { productStockDetails } = mockContext.dataSources.hybrisAPI;

  it("it returns the succesfully given a user email and bearer token", async () => {
    productStockDetails.mockReturnValueOnce(mockedProductStockDetailsResponse);
    const res = await resolvers.Query.productStockDetails(
      null,
      {
        pid: "1MQ081_0MCR_",
      },
      mockContext
    );
    expect(res).toEqual(mockedProductStockDetailsResolverResponse);
  });
});
describe("[Hybris Query.emailSubscription]", () => {
  const { emailSubscription } = mockContext.dataSources.hybrisAPI;

  it("it returns the succesfully given a user email and bearer token", async () => {
    emailSubscription.mockReturnValueOnce("");
    const res = await resolvers.Mutation.emailSubscription(
      null,
      {
        emailSubscriptionParams: {
          email: "kevins.ruiz@callawaygolf.com",
          token: "jWk-Y3rp_4bO5sYBaEvheRMfBVA",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedEmailSubscriptionResolverResponse);
  });
});
