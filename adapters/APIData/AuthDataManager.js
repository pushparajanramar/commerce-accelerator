import MockData from "./providers/Mock/MockData";
import HybrisOCC from "./providers/HybrisOCC/HybrisOCC";


export default class AuthDataManager {

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

    async createAuthToken(data) {
        if (this.config.enableOCC === 'true') {
            const hybrisOCC = new HybrisOCC()
            return await hybrisOCC.createUserToken(data)
        } else {
            const mockDataAPI = new MockData()
            return await mockDataAPI.createUserToken(data)
        }
    }
    async emailSubscription(data) {
        if (this.config.enableOCC === 'true') {
            const hybrisOCC = new HybrisOCC()
            return await hybrisOCC.emailSubscription(data)
        }
    }

}