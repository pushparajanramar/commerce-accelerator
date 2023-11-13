import { gql } from "@apollo/client";

export const Query = gql`
  type Query {
    productDetails(pid: String!): ProductDetails!
    breadcrumbDetails(categoryId: String!): BreadcrumbDetails!
    categoryFacets(categoryId: String!): CategoryFacets!
    carts(cartsParams: CartsParams!): CartsResponse!
    cart(cartParams: CartParams!): CartResponse!
    cartEntries(cartParams: CartParams!): CartEntriesResponse!
    productStockDetails(pid: String!): ProductStockDetailsResponse!
  }
`;
