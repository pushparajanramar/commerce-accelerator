import configuration from "@/constants/configuration";
import { getHomePageProductCarousel } from "./methods";
export function setGlobalState(getGlobalDataResponse) {
  const labels = {};
  let footerData = {};
  let headerDataResponse = {};

  if (getGlobalDataResponse.status === 200 && getGlobalDataResponse.response) {
    const globalResponse = getGlobalDataResponse.response;
    footerData = globalResponse?.footer;
    headerDataResponse = globalResponse?.header[0]
      ? globalResponse?.header[0]
      : {};
    for (const [key, value] of Object.entries(globalResponse)) {
      const data = value[0] ? value[0] : {};
      switch (key) {
        case configuration.PLPLabelTag: {
          labels.PLP = data?.labels;
          break;
        }
        case configuration.PDPLabelTag: {
          labels.PDP = data?.labels;
          break;
        }
        case configuration.headerTag: {
          labels.header = data;
          break;
        }
        case configuration.footerTag: {
          labels.footer = data;
          break;
        }
        case configuration.formValidationTag: {
          labels.formValidation = data;
          break;
        }
        case configuration.responseCodeTag: {
          labels.responseCode = data;
          break;
        }
        case configuration.screenReaderTag: {
          labels.screenReader = data;
          break;
        }
        case configuration.sizeChartTag: {
          labels.sizeChart = data;
          break;
        }
        case configuration.userAuthModal: {
          labels.userAuthModal = data;
          break;
        }
      }
    }
  }

  return { footerData, labels, headerDataResponse };
}

export function extractReferencedModularBlocks(page) {
  if (page && page.modular_blocks) {
    page.modular_blocks.map((block) => {
      if (block.referenced_section) {
        if (
          block.referenced_section.reference &&
          block.referenced_section.reference.length > 0
        ) {
          const modularBlock = block.referenced_section.reference[0];
          const blockName = modularBlock._content_type_uid.replace(
            /_reference/g,
            ""
          );
          const globalFieldData =
            modularBlock.global_field || modularBlock.global;
          block[`${blockName}`] = globalFieldData;
        }
      }
    });
  }
  return page;
}


export async function preFetchProductCarouselEntries(page) {
  if (page && page.modular_blocks) {
    for (let block of page.modular_blocks) {
      if (block.product_carousel) {
        const productCards = block.product_carousel.product_picker_sample;
        const productIds = productCards?.map((ele) => ele.product_id);
        const result = await getHomePageProductCarousel({ productIds });
        if (result.response && result.response.docs) {
          const default_products = result.response.docs;
          block.product_carousel.default_products =
            default_products.filter(Boolean);
        }
      }
    }
  }
  return page;
}
