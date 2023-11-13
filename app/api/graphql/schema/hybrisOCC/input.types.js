import { gql } from "@apollo/client";

export const typeDefs = gql`
  input CartsParams {
    user: String!
    token: String!
  }
  input MergeCartParams {
    user: String!
    token: String!
    loggedInCartGuid: String!
    anonymousCartGuid: String!
  }
  input CreateCartParams {
    user: String!
    token: String!
  }
  input CartParams {
    user: String!
    cartCode: String!
    token: String!
  }
  input CartProduct {
    code: String!
    quantity: Int!
  }
  input AddProductParams {
    user: String!
    cartCode: String!
    token: String!
    product: CartProduct!
  }
  input UpdateQuantityParams {
    user: String!
    cartCode: String!
    token: String!
    quantity: Int!
    entryNumber: Int!
  }
  input CDCClientTokenParams {
    UID: String!
    UIDSignature: String!
    timeStamp: String!
    idToken: String!
  }
  input EmailSubscriptionParams {
    email: String!
    token: String!
  }
`;
