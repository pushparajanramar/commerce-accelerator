import ProductData from "../../mocks/products/ProductData";
import autoSuggest from "../../mocks/products/autoSuggest";
import autoSuggestProduct from "../../mocks/products/autoSuggestProduct";
import categoryBasedProduct from "../../mocks/products/categoryBasedProduct";
import relatedAllItems from "../../mocks/products/relatedAllItems";
import similarItems from "../../mocks/products/similarItems";
import breadcrumb from "../../mocks/breadcrumb/breadcrumb";
import tokenData from "../../mocks/auth/tokenData";
import categoryFacets from "../../mocks/category/facets";
import productStock from "../../mocks/products/ProductStock";

export default class MockData {
    async fetchAutoSuggest(data) {
        return autoSuggest
    }

    async fetchAutoSuggestProduct(data) {
        return autoSuggestProduct
    }

    async fetchCategoryBasedProduct(data) {
        return categoryBasedProduct
    }

    async getProductDetails(data) {
        return ProductData
    }

    async fetchSimilarItems(data) {
        return similarItems
    }

    async fetchRelatedItemsCategoryProducts(data) {
        return relatedAllItems
    }


    async fetchProductCarouselDetail(data) {
        return autoSuggestProduct
    }

    async fetchBreadcrumDetail(data) {
        return breadcrumb
    }

    async createUserToken(data) {
        return tokenData
    }

    async fetchCategoryFacets(data) {
        return categoryFacets
    }

    async getProductStockDetails(data) {
        return productStock
    }
}