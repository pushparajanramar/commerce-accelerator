import { gql } from "@apollo/client";

export const Mutation = gql`
  type Mutation {
    createHybrisClientToken: HybrisClientTokenResponse!
    createCart(createCartParams: CreateCartParams): NewCartResponse!
    mergeCart(mergeCartParams: MergeCartParams): MergedCartResponse!
    addProductToCart(addProductParams: AddProductParams): NewCartEntryResponse!
    updateQuantity(
      updateQuantityParams: UpdateQuantityParams
    ): UpdatedEntryResponse!
    createCDCClientToken(CDCTokenParams: CDCClientTokenParams!): String!
    emailSubscription(
      emailSubscriptionParams: EmailSubscriptionParams!
    ): EmailSubscriptionResponse!
  }
`;
