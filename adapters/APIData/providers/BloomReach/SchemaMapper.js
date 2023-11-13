import configuration from "../../../../constants/configuration";
import {
  createColorVariantBasedOnBloomreach,
  isValidImageURL,
} from "../../../../lib/Common";
import ProductDataManager from "../../ProductDataManager";

export const makeAutoSuggestResponse = async (response) => {
  const result = response.response ? response.response : [];

  const products = result?.products?.map((item) => {
    return {
      title: item.title,
      productId: item.pid,
      url: item?.url?.replace(/TM/, "tm"),
      thumbImage: item.thumb_image,
      price: [
        {
          currencyIso: configuration.currencyIso,
          formattedValue: configuration.currencySymbol + item.sale_price,
          priceType: "sale_price",
          value: item.sale_price,
        },
        {
          currencyIso: configuration.currencyIso,
          formattedValue: configuration.currencySymbol + item.price,
          priceType: "price",
          value: item.price,
        },
        {
          currencyIso: configuration.currencyIso,
          formattedValue: configuration.currencySymbol + item.employee_price,
          priceType: "employee_price",
          value: item?.employee_price || 0.0,
        },
      ],
    };
  });

  const suggestions = result?.suggestions?.map((item) => {
    return {
      keyword: item.q,
    };
  });
  return {
    query: result?.q,
    suggestions,
    products,
  };
};

export const makePLPProductResponse = async (response) => {
  const _response = response?.response || null;
  if (!_response) {
    return response;
  }

  const result = _response.docs ? _response.docs : [];
  const dataManager = new ProductDataManager();
  //generate product facets
  const facets = response?.facet_counts?.facet_fields || {};

  //generate product information

  const products = await Promise.all(
    result.map(async (item) => {
      const variants = [];
      const productId = item.pid;
      const colorItemVariants = item.other_styles
        ? createColorVariantBasedOnBloomreach(item.other_styles)
        : [];
      //generate default size  variants
      let sizeItemVariants = [];
      let isGloveProduct = false;
      let isGiftProduct = false;
      let handOptions = [];

      const productInfo = await dataManager.fetchProductDetail({
        pid: productId,
      });
      if (
        productInfo.status === 200 &&
        productInfo.response &&
        productInfo.response.variants
      ) {
        const productResponse = productInfo?.response;
        sizeItemVariants = productResponse.variants.filter(
          (item) => item.name === "size"
        );
        isGloveProduct = productResponse?.isGloveProduct;
        isGiftProduct = productResponse?.isGiftProduct;
        handOptions = productResponse?.handOptions;
      }
      for (let size of sizeItemVariants) {
        variants.push({
          ...size,
          media: null,
          hexCode: null,
        });
      }

      //generate color swatch variants
      for (let color of colorItemVariants) {
        let imageUrl = color?.SwatchImage || "";
        if (!imageUrl.includes("http")) {
          imageUrl = configuration.colorSwatchBaseURLBloomreach + imageUrl;
        }
        const isValidImg = isValidImageURL(imageUrl);
        variants.push({
          name: "color",
          code: color.Code,
          selected: color.Code == productId ? true : false,
          stock: {
            stockLevelStatus:
              color.isProductInStock === "true"
                ? configuration.inStockStatus
                : configuration.outOfStockStatus,
          },
          url: color?.URL?.replace(/TM/, "tm"),
          value: color.Style,
          hexCode: color?.ColorHexCode || "",
          media: {
            altText: color.Name,
            isVideoMedia: !isValidImg,
            url: imageUrl,
          },
        });
      }
      //generate image urls
      const itemImages = item.product_images
        ? item.product_images.split("|")
        : [];
      const productImages = itemImages.map((ele) => {
        if (!ele.includes("http")) {
          ele = configuration.baseImageURL + ele;
        }
        const imgURLSplit = ele.split("/");
        const imgName =
          imgURLSplit.length > 0
            ? imgURLSplit[imgURLSplit.length - 1]
            : "product";

        const isValidaImg = isValidImageURL(ele);
        return {
          altText: imgName,
          isVideoMedia: !isValidaImg,
          url: ele,
        };
      });
      //prepare for product info
      const productBadge = item?.badge?.split("|")[0] || "";
      return {
        productId,
        title: item?.title || "",
        description: item?.description || "",
        url: item?.url?.replace(/TM/, "tm"),
        brand: item?.brand || "",
        badge: productBadge,
        price: [
          {
            currencyIso: configuration.currencyIso,
            formattedValue: configuration.currencySymbol + item.sale_price,
            priceType: "sale_price",
            value: item.sale_price,
          },
          {
            currencyIso: configuration.currencyIso,
            formattedValue: configuration.currencySymbol + item.price,
            priceType: "price",
            value: item.price,
          },
          {
            currencyIso: configuration.currencyIso,
            formattedValue: configuration.currencySymbol + item.employee_price,
            priceType: "employee_price",
            value: item?.employee_price || 0.0,
          },
        ],
        stock: {
          stockLevelStatus:
            colorItemVariants[0] &&
            colorItemVariants[0]?.isProductInStock === "true"
              ? configuration.inStockStatus
              : configuration.outOfStockStatus,
        },
        images: productImages,
        promotionText: item?.promotion_attr || "",
        variants,
        isGloveProduct,
        isGiftProduct,
        handOptions,
      };
    })
  );
  return {
    total: _response?.numFound || 0,
    start: _response?.start || 0,
    docs: products,
    facets,
  };
};

export const makeRelatedAllResponse = async (response) => {
  if (!response) {
    return response;
  }
  const responseJSON =
    typeof response === "string" ? JSON.parse(response) : response;
  const relatedCategoriesResponse = responseJSON["related-category"]
    ? responseJSON["related-category"]
    : [];
  const relatedItemsResponse = responseJSON["related-item"]
    ? responseJSON["related-item"]
    : [];
  const relatedProductsResponse = responseJSON["more-results"]
    ? responseJSON["more-results"]
    : [];

  const relatedCategories = relatedCategoriesResponse.map((item) => {
    return {
      title: item.anchor,
      url: item.url.replace(/TM/, "tm"),
    };
  });

  const relatedItems = relatedItemsResponse.map((item) => {
    return {
      title: item.anchor,
      url: item.url.replace(/TM/, "tm"),
    };
  });

  const relatedProducts = relatedProductsResponse.map((item) => {
    let imageUrl = item.image;
    if (!imageUrl.includes("http")) {
      imageUrl = configuration.baseImageURL + imageUrl;
    }
    const isValidImg = isValidImageURL(imageUrl);
    const imgURLSplit = imageUrl.split("/");
    const imgName =
      imgURLSplit.length > 0 ? imgURLSplit[imgURLSplit.length - 1] : "product";

    return {
      title: item.title,
      url: item.url.replace(/TM/, "tm"),
      description: item.description,
      shortDescription: item["short-description"],
      media: {
        altText: imgName,
        isVideoMedia: !isValidImg,
        url: imageUrl,
      },
    };
  });

  return {
    relatedCategories,
    relatedItems,
    relatedProducts,
  };
};
