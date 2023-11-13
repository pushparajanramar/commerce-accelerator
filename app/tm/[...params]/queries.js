import { gql } from "@apollo/client";

export const BREADCRUMBS = gql`
  query BreadcrumbDetails($categoryId: String!) {
    breadcrumbDetails(categoryId: $categoryId) {
      status
      errorMsg
      response {
        list {
          code
          isActive
          title
          url
        }
        pageTitle
      }
    }
  }
`;

export const PRODUCT_DETAILS = gql`
  query ProductDetails($pid: String!) {
    productDetails(pid: $pid) {
      status
      errorMsg
      response {
        breadcrumbs {
          list {
            code
            isActive
            title
            url
          }
          pageTitle
        }
        description
        descriptionIcons {
          title
          url
        }
        fabricType
        fabricCareDescription
        imageAndText {
          description
          desktopLayout
          fallBackMediaUrl
          isVideoMedia
          title
          url
        }
        images {
          url
          isVideoMedia
          altText
        }
        price {
          currencyIso
          value
        }
        productId
        sizeAndFitDescription
        stock {
          stockLevelStatus
        }
        title
        variants {
          code
          media {
            altText
            isVideoMedia
            url
          }
          name
          selected
          stock {
            stockLevelStatus
          }
          url
          value
        }
        videoAndText {
          description
          desktopLayout
          fallBackMediaUrl
          isVideoMedia
          title
          url
        }
        isGloveProduct
        isGiftProduct
        handOptions
        categories {
          code
          url
        }
      }
    }
  }
`;

export const AUTO_SUGGEST_PRODUCT = gql`
  query AutoSuggestProduct($suggestionParams: AutoSuggestProductParams) {
    autoSuggestProduct(suggestionParams: $suggestionParams) {
      status
      errorMsg
      response {
        start
        total
        docs {
          badge
          brand
          description
          images {
            altText
            isVideoMedia
            url
          }
          price {
            currencyIso
            formattedValue
            priceType
            value
          }
          productId
          promotionText
          stock {
            stockLevelStatus
          }
          title
          url
          variants {
            code
            media {
              altText
              isVideoMedia
              url
            }
            name
            selected
            stock {
              stockLevelStatus
            }
            url
            value
            hexCode
          }
        }
        facets {
          Gender {
            count
            name
          }
          brand {
            count
            name
          }
          design {
            count
            name
          }
          sizes {
            count
            name
          }
          type {
            count
            name
          }
        }
      }
    }
  }
`;
export const CATEGORY_BASED_PRODUCT_FACETS = gql`
  query CategoryBasedProducts(
    $categoryBasedProductParams: CategoryBasedProductParams
  ) {
    categoryBasedProducts(
      categoryBasedProductParams: $categoryBasedProductParams
    ) {
      status
      errorMsg
      response {
        facets {
          Gender {
            count
            name
          }
          brand {
            count
            name
          }
          design {
            count
            name
          }
          sizes {
            count
            name
          }
          type {
            count
            name
          }
          colorGroups {
            count
            name
          }
          fabricTechnology {
            count
            name
          }
          sleeveLength {
            count
            name
          }
        }
      }
    }
  }
`;
export const CATEGORY_BASED_PRODUCT = gql`
  query CategoryBasedProducts(
    $categoryBasedProductParams: CategoryBasedProductParams
  ) {
    categoryBasedProducts(
      categoryBasedProductParams: $categoryBasedProductParams
    ) {
      status
      errorMsg
      response {
        start
        total
        docs {
          badge
          brand
          description
          images {
            altText
            isVideoMedia
            url
          }
          price {
            currencyIso
            formattedValue
            priceType
            value
          }
          productId
          promotionText
          stock {
            stockLevelStatus
          }
          title
          url
          variants {
            code
            media {
              altText
              isVideoMedia
              url
            }
            name
            selected
            stock {
              stockLevelStatus
            }
            url
            value
            hexCode
          }
          isGloveProduct
          isGiftProduct
          handOptions
        }
        facets {
          Gender {
            count
            name
          }
          brand {
            count
            name
          }
          design {
            count
            name
          }
          sizes {
            count
            name
          }
          type {
            count
            name
          }
          colorGroups {
            count
            name
          }
          fabricTechnology {
            count
            name
          }
          sleeveLength {
            count
            name
          }
        }
      }
    }
  }
`;

export const CATEGORY_FACETS = gql`
  query CategoryFacets($categoryId: String!) {
    categoryFacets(categoryId: $categoryId) {
      status
      errorMsg
      response {
        id
        name
        url
      }
    }
  }
`;
