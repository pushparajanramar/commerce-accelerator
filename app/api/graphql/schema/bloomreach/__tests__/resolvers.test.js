import { resolvers } from "../resolvers";
import { mockedAutoSuggestResponse } from "../../../__mocks__/datasources/bloomreach/suggestAPI";
import {
  mockedProductsFromCategoryResponse,
  mockedSuggestionByProductResponse,
} from "../../../__mocks__/datasources/bloomreach/coreAPI";
import { mockedRelatedItemsCategoriesProductsResponse } from "../../../__mocks__/datasources/bloomreach/relatedAPI";
import {
  mockedAutoSuggestResolverResponse,
  mockedAutoSuggestProductResolverResponse,
  mockedSimilarItemsResolverResponse,
  mockedCategoryBasedProductsResolverResponse,
  mockedRelatedItemsCategoriesProductsResolverResponse,
  mockedProductCarouselDetailsResolverResponse,
} from "../../../__mocks__/resolvers/bloomreach";
import { mockedSimilarItemsResponse } from "../../../__mocks__/datasources/bloomreach/pathwaysAPI";

const mockContext = {
  dataSources: {
    bloomreachSuggestAPI: {
      autoSuggestions: jest.fn(),
    },
    bloomreachCoreAPI: {
      autoSuggestionByProduct: jest.fn(),
      productsFromCategory: jest.fn(),
    },
    bloomreachPathwaysAPI: {
      similarItems: jest.fn(),
    },
    bloomreachRelatedAPI: {
      relatedItemsCategoriesProducts: jest.fn(),
    },
  },
};
describe("[Bloomreach Query.autoSugestions]", () => {
  const { autoSuggestions } = mockContext.dataSources.bloomreachSuggestAPI;

  it("returns a formatted auto suggestion response", async () => {
    autoSuggestions.mockReturnValueOnce(mockedAutoSuggestResponse);

    const res = await resolvers.Query.autoSuggestions(
      null,
      {
        suggestionSource: "zinn",
      },
      mockContext
    );
    expect(res).toEqual(mockedAutoSuggestResolverResponse);
  });
});

describe("[Bloomreach Query.autoSuggestProduct]", () => {
  const { autoSuggestionByProduct } = mockContext.dataSources.bloomreachCoreAPI;

  it("returns a formatted auto suggestion response based on a product", async () => {
    autoSuggestionByProduct.mockReturnValueOnce(
      mockedSuggestionByProductResponse
    );
    const res = await resolvers.Query.autoSuggestProduct(
      null,
      {
        suggestionParams: {
          productId: "0132",
          start: 0,
          sort: null,
          limit: 1,
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedAutoSuggestProductResolverResponse);
  });
});

describe("[Bloomreach Query.categoryBasedProducts]", () => {
  const { productsFromCategory } = mockContext.dataSources.bloomreachCoreAPI;

  it("returns a formatted product based on a category", async () => {
    productsFromCategory.mockReturnValueOnce(
      mockedProductsFromCategoryResponse
    );
    const res = await resolvers.Query.categoryBasedProducts(
      null,
      {
        categoryBasedProductParams: {
          start: 0,
          sort: null,
          limit: 1,
          categoryid: "0132",
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedCategoryBasedProductsResolverResponse);
  });
});

describe("[Bloomreach Query.similarItems]", () => {
  const { similarItems } = mockContext.dataSources.bloomreachPathwaysAPI;

  it("returns similar items to the one provided", async () => {
    similarItems.mockReturnValueOnce(mockedSimilarItemsResponse);
    const res = await resolvers.Query.similarItems(
      null,
      {
        similarItemsParams: {
          items: "1MM211_4VIL_",
          limit: 1,
          start: 0,
        },
      },
      mockContext
    );
    expect(res).toEqual(mockedSimilarItemsResolverResponse);
  });
});

describe("[Bloomreach Query.relatedItemsCategoriesProducts]", () => {
  const { relatedItemsCategoriesProducts } =
    mockContext.dataSources.bloomreachRelatedAPI;

  it("returns a formatted response of items, categories, and other products related to a target product", async () => {
    relatedItemsCategoriesProducts.mockReturnValueOnce(
      mockedRelatedItemsCategoriesProductsResponse
    );
    const res = await resolvers.Query.relatedItemsCategoriesProducts(
      null,
      {
        productUrl:
          "https://www.travismathew.com/TM/TOPS/Button-Ups/DIVE-IN/p/1MR511_1WHT_",
      },
      mockContext
    );
    expect(res).toEqual(mockedRelatedItemsCategoriesProductsResolverResponse);
  });
});

describe("[Bloomrach Query.productCarouselDetails]", () => {
  const { autoSuggestionByProduct } = mockContext.dataSources.bloomreachCoreAPI;
  it("returns a products to display in carousel", async () => {
    autoSuggestionByProduct.mockReturnValueOnce(
      mockedSuggestionByProductResponse
    );
    const res = await resolvers.Query.productCarouselDetails(
      null,
      {
        productIds: ["1MZ419_0BLK_"],
      },
      mockContext
    );
    expect(res).toEqual(mockedProductCarouselDetailsResolverResponse);
  });
});
