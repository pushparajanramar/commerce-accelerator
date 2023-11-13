import MockData from "./providers/Mock/MockData";
import BloomReach from "./providers/BloomReach/BloomReach";
import HybrisOCC from "./providers/HybrisOCC/HybrisOCC";


export default class ProductDataManager {

    constructor() {
        this.config = this.getConfig()
    }

    getConfig() {
        return {
            enableBloomreach: process.env.ENABLE_BLOOMREACH,
            enableOCC: process.env.ENABLE_OCC_API,
            enableMock: process.env.ENABLE_MOCK,
        }
    }

    async fetchAutoSuggest(data) {
        if (this.config.enableBloomreach === 'true') {
            const BloomReachAPI = new BloomReach()
            return await BloomReachAPI.fetchAutoSuggest(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.fetchAutoSuggest(data)
        }
    }

    async fetchAutoSuggestProduct(data) {
        if (this.config.enableBloomreach === 'true') {
            const BloomReachAPI = new BloomReach()
            return await BloomReachAPI.fetchAutoSuggestProduct(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.fetchAutoSuggestProduct(data)
        }
    }

    async fetchCategoryBasedProduct(data) {
        if (this.config.enableBloomreach === 'true') {
            const BloomReachAPI = new BloomReach()
            return await BloomReachAPI.fetchCategoryBasedProduct(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.fetchCategoryBasedProduct(data)
        }
    }

    async fetchProductDetail(data) {
        if (this.config.enableOCC === 'true') {
            const hybrisOCC = new HybrisOCC()
            return await hybrisOCC.getProductDetails(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.getProductDetails(data)
        }
    }

    async fetchSimilarItems(data) {
        if (this.config.enableBloomreach === 'true') {
            const BloomReachAPI = new BloomReach()
            return await BloomReachAPI.fetchSimilarItems(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.fetchSimilarItems(data)
        }
    }

    async fetchRelatedItemsCategoryProducts(data) {
        if (this.config.enableBloomreach === 'true') {
            const BloomReachAPI = new BloomReach()
            return await BloomReachAPI.fetchRelatedItemsCategoryProducts(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.fetchRelatedItemsCategoryProducts(data)
        }
    }

    async fetchProductCarouselDetail(data) {
        if (this.config.enableBloomreach === 'true') {
            const BloomReachAPI = new BloomReach()
            return await BloomReachAPI.fetchProductCarouselDetail(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.fetchProductCarouselDetail(data)
        }
    }

    async fetchCategoryFacets(data) {
        if (this.config.enableOCC === 'true') {
            const hybrisOCC = new HybrisOCC()
            return await hybrisOCC.fetchCategoryFacets(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.fetchCategoryFacets(data)
        }
    }

    async fetchProductStockDetail(data) {
        if (this.config.enableOCC === 'true') {
            const hybrisOCC = new HybrisOCC()
            return await hybrisOCC.getProductStockDetails(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.getProductStockDetails(data)
        }
    }

}