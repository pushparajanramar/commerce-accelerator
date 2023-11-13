import { gql } from '@apollo/client';

/*
    Auto Suggest Endpoint Types
    added here for possible future use case
    delete if not needed in the future
*/
export const typeDefs = gql`
    type ResponseHeader {
     zkConnected: Boolean!
     status: Int!
     QTime: Int!
    }
    type Suggestion {
     q: String!
     dq: String!
    }
   type Product {
    sale_price: Float!
    price: Float!
    title: String!
    url: String!
    thumb_image: String!
    pid: String!
   }
   type AutoSuggestionResponse {
    q: String!
    suggestions: [Suggestion!]
    numFound: Int!
    products: [Product!]
   }
   type AutoSuggestions {
    responseHeader: ResponseHeader
    response: AutoSuggestionResponse
   }
   type Price {
    currencyIso: String!
    formattedValue: String!
    priceType: String!
    value: Float!
   }
   type SuggestedProduct {
    title: String!
    productId: String!
    url: String!
    thumbImage: String!
    price: [Price!]
   }
   type MappedSuggestion {
    keyword: String!
   }
   type MappedAutoSuggestions {
    query: String!
    suggestions: [MappedSuggestion!]
    products: [SuggestedProduct!]
   }
   type MappedAutoSuggestResponse {
    status: Int!
    response: MappedAutoSuggestions
    errorResponse: String!
   }
`;