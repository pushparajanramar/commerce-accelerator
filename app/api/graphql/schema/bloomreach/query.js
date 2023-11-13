import { gql } from "@apollo/client";

export const Query = gql`
  type Query {
    autoSuggestions(suggestionSource: String!): AutoSuggestResponse
    autoSuggestProduct(
      suggestionParams: AutoSuggestProductParams
    ): PPLUIResponse
    categoryBasedProducts(
      categoryBasedProductParams: CategoryBasedProductParams
    ): PPLUIResponse
    similarItems(similarItemsParams: SimilarItemsParams): PPLUIResponse
    relatedItemsCategoriesProducts(
      productURL: String!
    ): RelatedItemsCategoriesProducts
    productCarouselDetails(productIds: [String]!): CarouselProducts
  }
`;
