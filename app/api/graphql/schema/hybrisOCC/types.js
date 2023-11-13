import { gql } from "@apollo/client";

export const typeDefs = gql`
  interface Cart {
    code: String!
    entries: [CartEntry!]!
    guid: String!
    totalItems: Int!
    totalPrice: HybrisPrice!
    totalPriceWithTax: HybrisPrice!
  }
  type Icon {
    url: String!
    title: String!
  }
  type ListItem {
    url: String!
    title: String!
    code: String!
    isActive: Boolean!
  }
  type Breadcrumbs {
    list: [ListItem!]!
    pageTitle: String!
  }
  type TextAndMedia {
    url: String!
    title: String!
    description: String!
    desktopLayout: String!
    fallBackMediaUrl: String!
    isVideoMedia: Boolean!
  }
  type ProductCategory {
    code: String!
    url: String!
  }
  type HybrisProduct implements ProductBaseType {
    productId: String!
    baseProduct: String!
    title: String!
    description: String!
    url: String!
    brand: String!
    badge: String!
    price: [HybrisPrice!]
    stock: Stock!
    images: [Image!]
    promotionText: String!
    variants: [Variant!]!
    sizeAndFitDescription: String!
    fabricType: String!
    fabricCareDescription: String!
    descriptionIcons: [Icon!]!
    breadcrumbs: Breadcrumbs!
    imageAndText: [TextAndMedia!]!
    videoAndText: [TextAndMedia!]!
    isGloveProduct: Boolean!
    isGiftProduct: Boolean!
    handOptions: [String!]!
    categories: [ProductCategory!]!
  }
  type ProductDetails {
    status: Int!
    response: HybrisProduct
    errorMsg: String
  }
  type ProductStockResponse {
    stockLevel: String!
    stockQty: Int!
  }
  type ProductStockDetailsResponse {
    status: Int!
    response: ProductStockResponse
    errorMsg: String
  }
  type BreadcrumbDetails {
    status: Int!
    response: Breadcrumbs!
    errorMsg: String
  }
  type CategoryFacet {
    id: String!
    name: String!
    url: String!
  }
  type CategoryFacets {
    status: Int!
    response: [CategoryFacet]
    errorMsg: String
  }
  type HybrisClientToken {
    access_token: String!
    token_type: String!
    expires_in: Int!
    scope: String!
  }
  type HybrisClientTokenResponse {
    status: Int!
    response: HybrisClientToken
    errorMsg: String
  }
  type HybrisPrice implements Price {
    currencyIso: String!
    value: Float!
  }
  type NewCart implements Cart {
    type: String!
    code: String!
    entries: [CartEntry!]!
    guid: String!
    totalItems: Int!
    totalPrice: HybrisPrice!
    totalPriceWithTax: HybrisPrice!
  }
  type NewCartResponse {
    status: Int!
    response: NewCart
    errorMsg: String
  }
  type SingleCart implements Cart {
    type: String!
    code: String!
    entries: [CartEntry!]!
    guid: String!
    totalItems: Int!
    totalPrice: HybrisPrice!
    totalPriceWithTax: HybrisPrice!
  }
  type MergedCartResponse {
    status: Int!
    response: SingleCart
    errorMsg: String
  }
  type CartEntryProduct {
    baseProduct: String!
    code: String!
    isGiftProduct: Boolean!
    name: String!
    price: HybrisPrice!
    promotionPrice: HybrisPrice!
    purchasable: Boolean!
    url: String!
  }
  type CartEntry {
    configurationInfos: [String!]!
    entryNumber: Int!
    giveAway: Boolean!
    product: CartEntryProduct!
    quantity: Int!
    totalPrice: HybrisPrice!
  }
  type RetrivedCart implements Cart {
    code: String!
    entries: [CartEntry!]!
    guid: String!
    totalItems: Int!
    totalPrice: HybrisPrice!
    totalPriceWithTax: HybrisPrice!
  }
  type CartCollection {
    carts: [RetrivedCart!]!
  }
  type CartsResponse {
    status: Int!
    response: CartCollection
    errorMsg: String
  }
  type CartResponse {
    status: Int!
    response: SingleCart
    errorMsg: String
  }
  type CartEntries {
    orderEntries: [CartEntry!]!
  }
  type CartEntriesResponse {
    status: Int!
    response: CartEntries
    errorMsg: String
  }
  type NewCartEntry {
    entry: CartEntry!
  }
  type NewCartEntryResponse {
    status: Int!
    response: NewCartEntry
    errorMsg: String
  }
  type UpdatedQuantityEntry {
    entry: CartEntry!
  }
  type UpdatedEntryResponse {
    status: Int!
    response: UpdatedQuantityEntry
    errorMsg: String
  }
  type EmailSubscriptionResponse {
    status: Int!
    response: String
    errorMsg: String
  }
`;
