import { gql } from "@apollo/client";

export const typeDefs = gql`
  interface Price {
    currencyIso: String!
    value: Float!
  }
  interface ProductBaseType {
    productId: String!
    title: String!
    description: String
    url: String!
    brand: String
    badge: String
    price: [Price!]
    stock: Stock!
    images: [Image!]
    promotionText: String
    variants: [Variant]
  }
  type Stock {
    stockLevelStatus: String!
  }
  type Variant {
    name: String!
    code: String!
    stock: Stock!
    url: String!
    selected: Boolean!
    media: Image
    value: String!
    hexCode: String
  }
`;
