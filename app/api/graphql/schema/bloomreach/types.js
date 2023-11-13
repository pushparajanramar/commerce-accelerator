import { gql } from "@apollo/client";

export const typeDefs = gql`
  type BloomreachPrice implements Price {
    currencyIso: String!
    formattedValue: String!
    priceType: String!
    value: Float!
  }
  type Image {
    altText: String!
    isVideoMedia: Boolean!
    url: String!
  }
  type BloomreachProduct implements ProductBaseType {
    productId: String!
    title: String!
    description: String
    url: String!
    brand: String
    badge: String
    price: [BloomreachPrice!]
    stock: Stock!
    images: [Image!]
    promotionText: String
    variants: [Variant]
    isGloveProduct: Boolean!
    isGiftProduct: Boolean!
    handOptions: [String!]!
  }
  type Suggestion {
    keyword: String!
  }
  type SuggestedProduct {
    title: String!
    productId: String!
    url: String!
    thumbImage: String!
    price: [BloomreachPrice!]
  }
  type MappedAutoSuggestions {
    query: String!
    suggestions: [Suggestion!]
    products: [SuggestedProduct!]
  }
  type AutoSuggestResponse {
    status: Int!
    response: MappedAutoSuggestions
    errorMsg: String
  }
  type Facet {
    name: String!
    count: Int!
  }
  type Facets {
    sizes: [Facet]
    brand: [Facet]
    Gender: [Facet]
    colorGroups: [Facet]
    sleeveLength: [Facet]
    type: [Facet]
    design: [Facet]
    fabricTechnology: [Facet]
  }
  type PPLProductResponse {
    total: Int!
    start: Int!
    docs: [BloomreachProduct!]!
    facets: Facets!
  }
  type PPLUIResponse {
    status: Int!
    response: PPLProductResponse
    errorMsg: String
  }
  type RelatedItem {
    title: String!
    url: String!
  }
  type RelatedCategory {
    title: String!
    url: String!
  }
  type RelatedProduct {
    title: String!
    url: String!
    description: String!
    shortDescription: String!
    media: Image!
  }
  type RelatedItemsCategoriesProducts {
    status: Int!
    relatedCategories: [RelatedCategory]
    relatedItems: [RelatedItem]
    relatedProducts: [RelatedProduct]
    errorMsg: String
  }
  type CarouselProducts {
    status: Int!
    response: [BloomreachProduct!]
    errorMsg: String
  }
`;
