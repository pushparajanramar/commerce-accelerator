import { gql } from "@apollo/client";

export const typeDefs = gql`
  input CategoryBasedProductParams {
    categoryId: String!
    filters: String!
    sort: String!
    start: Int!
    limit: Int!
  }
  input AutoSuggestProductParams {
    productId: String!
    filters: String
    sort: String!
    start: Int!
    limit: Int!
  }
  input SimilarItemsParams {
    items: String!
    limit: Int!
    start: Int!
  }
`;
