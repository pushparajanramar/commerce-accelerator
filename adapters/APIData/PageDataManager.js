import MockData from "./providers/Mock/MockData";
import HybrisOCC from "./providers/HybrisOCC/HybrisOCC";


export default class PageDataManager {

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

    async fetchBreadcrumbDetail(data) {
        if (this.config.enableOCC === 'true') {
            const hybrisOCC = new HybrisOCC()
            return await hybrisOCC.fetchBreadcrumbDetail(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.fetchBreadcrumbDetail(data)
        }
    }

}