import MockData from "./providers/Mock/MockData";
import HybrisOCC from "./providers/HybrisOCC/HybrisOCC";

export default class CartDataManager {
  constructor() {
    this.config = this.getConfig();
  }

  getConfig() {
    return {
      enableBloomreach: process.env.ENABLE_BLOOMREACH,
      enableOCC: process.env.ENABLE_OCC_API,
      enableMock: process.env.ENABLE_MOCK,
    };
  }

  async createGuestAuthToken() {
    if (this.config.enableOCC === "true") {
      const hybrisOCC = new HybrisOCC();
      return await hybrisOCC.createGuestToken();
    }

  }

  async createApiCart({ user, token }) {
    if (this.config.enableOCC === "true") {
      const hybrisOCC = new HybrisOCC();
      return await hybrisOCC.createCart({ user, token });
    }
  }

  async addProductToCart(data) {
    if (this.config.enableOCC === "true") {
      const hybrisOCC = new HybrisOCC();
      return await hybrisOCC.AddProductToCart(data);
    }
  }

  async retrieveCart(data) {
    if (this.config.enableOCC === "true") {
      const hybrisOCC = new HybrisOCC();
      return await hybrisOCC.retrieveCartWithIdentifier(data);
    }
  }
}
