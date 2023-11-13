import configuration from "../../../../constants/configuration";

export const makeProductResponse = async (item) => {
  if (!item.code) {
    return item;
  }
  let variants = [];
  let colorItemVariants = [];
  let sizeItemVariants = item?.variantOptions || [];
  let handSizeItemVariants = item?.variantOptions || [];
  const productId = item.code;

  if (item.baseOptions) {
    if (item.baseOptions.length > 1) {
      colorItemVariants = item.baseOptions[1].options;
      sizeItemVariants = item.baseOptions[0].options;
    } else {
      colorItemVariants = item.baseOptions[0].options;
    }
  }

  //generate default color  variants
  for (let color of colorItemVariants) {
    const variantOptionQualifier =
      color?.variantOptionQualifiers[0]?.name &&
      color?.variantOptionQualifiers[0]?.qualifier === "style"
        ? color?.variantOptionQualifiers[0]
        : null;
    const mediaObj = variantOptionQualifier?.image;
    let imageUrl = mediaObj?.url;
    if (!imageUrl?.includes("http")) {
      imageUrl = configuration.baseImageURL + imageUrl;
    }
    const stockLevelStatus = color?.stock?.stockLevelStatus;
    variants.push({
      name: "color",
      code: color.code,
      selected:
        color.code == productId || color.code == item.baseProduct
          ? true
          : false,
      stock: {
        stockLevelStatus:
          stockLevelStatus === "inStock"
            ? configuration.inStockStatus
            : stockLevelStatus === "lowStock"
            ? configuration.lowStockStatus
            : configuration.outOfStockStatus,
      },
      url: color?.url?.replace(/TM/, "tm"),
      value: variantOptionQualifier?.value,
      hexCode: null,
      media: {
        altText: mediaObj?.altText,
        isVideoMedia: mediaObj?.isVideoMedia,
        url: imageUrl,
      },
    });
  }

  //generate image urls
  const itemImages = item.images ? item.images : [];
  const productImages = itemImages.map((ele) => {
    if (!ele.url?.includes("http")) {
      ele.url = configuration.baseImageURL + ele.url;
    }
    return {
      altText: ele.altText,
      isVideoMedia: ele.isVideoMedia,
      galleryIndex: ele.galleryIndex,
      url: ele.url,
    };
  });

  //prepare for product info
  const productBadge = item?.badge?.split("|")[0] || "";
  const stockLevelStatus = item?.stock?.stockLevelStatus;
  ///price info
  const salePriceObj =
    item.promotionPrice.value > 0 ? item.promotionPrice : item.price;
  const normalPrice = item.price;
  // Description Icons
  const descriptionIcons =
    item.fabricType === "PrestigePurePerformance"
      ? [
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/bltd343eb0cb848def1/6515a0014e27a0c6614f75db/easy_wash_wear.svg?branch=${process.env.branch_cg}`,
            title: "Easy Wash & Wear",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt17489cb3213680cd/6515a01bd45f29875200baed/lightweight.svg?branch=${process.env.branch_cg}`,
            title: "Lightweight",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt761af74ba783e876/6515a00acf50bf084bfff69a/enhanced_quick_dry.svg?branch=${process.env.branch_cg}`,
            title: "Enhanced Quick-Dry",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt99faf4b5554b87ff/6515a0126fefa78d0fc4370c/enhanced_stretch.svg?branch=${process.env.branch_cg}`,
            title: "Enhanced Stretch",
          },
        ]
      : item.fabricType === "PrestigeLifestylePerformance"
      ? [
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/bltd343eb0cb848def1/6515a0014e27a0c6614f75db/easy_wash_wear.svg?branch=${process.env.branch_cg}`,
            title: "Easy Wash & Wear",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt99faf4b5554b87ff/6515a0126fefa78d0fc4370c/enhanced_stretch.svg?branch=${process.env.branch_cg}`,
            title: "Enhanced Stretch",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt4ab1dca05754a800/6515a02b4d72e92a0384cb67/wrinkle_resistant.svg?branch=${process.env.branch_cg}`,
            title: "Wrinkle Resistant",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt7001ff6dad9d4ae5/6515a023a0bdc088366f162b/supreme_comfort.svg?branch=${process.env.branch_cg}`,
            title: "Supreme Comfort",
          },
        ]
      : item.fabricType === "PremiumPerformance"
      ? [
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/bltd343eb0cb848def1/6515a0014e27a0c6614f75db/easy_wash_wear.svg?branch=${process.env.branch_cg}`,
            title: "Easy Wash & Wear",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt99faf4b5554b87ff/6515a0126fefa78d0fc4370c/enhanced_stretch.svg?branch=${process.env.branch_cg}`,
            title: "Enhanced Stretch",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt4ab1dca05754a800/6515a02b4d72e92a0384cb67/wrinkle_resistant.svg?branch=${process.env.branch_cg}`,
            title: "Wrinkle Resistant",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt7001ff6dad9d4ae5/6515a023a0bdc088366f162b/supreme_comfort.svg?branch=${process.env.branch_cg}`,
            title: "Supreme Comfort",
          },
        ]
      : item.fabricType === "AllDayComfort"
      ? [
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/bltd343eb0cb848def1/6515a0014e27a0c6614f75db/easy_wash_wear.svg?branch=${process.env.branch_cg}`,
            title: "Easy Wash & Wear",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt99faf4b5554b87ff/6515a0126fefa78d0fc4370c/enhanced_stretch.svg?branch=${process.env.branch_cg}`,
            title: "Enhanced Stretch",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt4ab1dca05754a800/6515a02b4d72e92a0384cb67/wrinkle_resistant.svg?branch=${process.env.branch_cg}`,
            title: "Wrinkle Resistant",
          },
          {
            url: `https://images.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt7001ff6dad9d4ae5/6515a023a0bdc088366f162b/supreme_comfort.svg?branch=${process.env.branch_cg}`,
            title: "Supreme Comfort",
          },
        ]
      : [];
  // Breadcrumbs
  const breadcrumbs = item?.breadcrumbs
    ? await makeBreadcrumbResponse(item.breadcrumbs)
    : [];

  const productBenefits =
    item?.productBenefits?.map((ele) => {
      let url = "";
      let fallBackMediaUrl = "";
      if (!ele.benefitImage?.url?.includes("http")) {
        url = configuration.baseImageURL + ele?.benefitImage?.url;
      }
      if (!ele.fallBackMedia?.url?.includes("http")) {
        fallBackMediaUrl = configuration.baseImageURL + ele?.fallBackMedia?.url;
      }
      return {
        url,
        title: ele?.title || "",
        description: ele?.description || "",
        desktopLayout: ele?.desktopLayout || "",
        fallBackMediaUrl,
        isVideoMedia: ele?.benefitImage?.isVideoMedia,
      };
    }) || [];

  const videoAndText = productBenefits.filter((el) => el.isVideoMedia);
  const imageAndText = productBenefits.filter((el) => !el.isVideoMedia);
  const isGloveProduct = item?.isGloveProduct || false;
  const isGiftProduct = item?.isGiftProduct || false;

  //generate hand size swatch variants
  const handOptions = [];
  if (isGloveProduct) {
    for (let item of handSizeItemVariants) {
      const code = item.code?.substr(productId.length);
      const handOption = code?.split("_");
      if (!handOptions.includes(handOption[0])) {
        handOptions.push(handOption[0].trim());
      }
    }

    const handSizeItemVariantsData = getSizeVariantFromProductDetail(
      handSizeItemVariants,
      productId
    );
    if (handSizeItemVariantsData) {
      variants = variants.concat(handSizeItemVariantsData);
    }
  } else {
    //generate size swatch variants
    const sizeItemVariantsData = getSizeVariantFromProductDetail(
      sizeItemVariants,
      productId
    );
    if (sizeItemVariantsData) {
      variants = variants.concat(sizeItemVariantsData);
    }
  }

  const product = {
    productId,
    baseProduct: item?.baseProduct || "",
    title: item.name,
    description: item?.description || "",
    url: item?.url?.replace(/TM/, "tm"),
    brand: item?.brand || "",
    badge: productBadge,
    isGloveProduct,
    isGiftProduct,
    handOptions,
    price: [
      {
        currencyIso: salePriceObj.currencyIso,
        formattedValue: salePriceObj.formattedValue,
        priceType: "sale_price",
        value: salePriceObj.value,
      },
      {
        currencyIso: normalPrice.currencyIso,
        formattedValue: normalPrice.formattedValue,
        priceType: "price",
        value: normalPrice.value,
      },
      {
        currencyIso: salePriceObj.currencyIso,
        formattedValue: salePriceObj.formattedValue,
        priceType: "employee_price",
        value: salePriceObj.value,
      },
    ],
    stock: {
      stockLevelStatus:
        stockLevelStatus === "inStock"
          ? configuration.inStockStatus
          : stockLevelStatus === "lowStock"
          ? configuration.lowStockStatus
          : configuration.outOfStockStatus,
    },
    images: productImages,
    promotionText: item?.promotion_attr || "",
    sizeAndFitDescription: item?.sizeAndFitDescription || "",
    variants,
    fabricType: item?.fabricType || "",
    fabricCareDescription: item?.fabricCareDescription || "",
    sizeAndFitDescription: item?.sizeAndFitDescription || "",
    descriptionIcons,
    breadcrumbs,
    imageAndText,
    videoAndText,
    categories: item?.categories || [],
  };
  return product;
};

export const makeBreadcrumbResponse = async (response) => {
  if (!response) {
    return response;
  }

  const breadcrumbs = response?.breadcrumbs ? response.breadcrumbs : response;
  const list = [];
  let pageTitle = "";

  for (let i = 0; i < breadcrumbs.length; i++) {
    const item = breadcrumbs[i];
    const isTMLink = item.name && item.name.toLowerCase() === "tm";
    list.push({
      url: isTMLink ? "/" : item.url ? item.url.toLowerCase() : "#",
      title: isTMLink ? "HOME" : item?.name || "",
      code: item?.categoryCode || "",
      isActive: i === breadcrumbs.length - 1,
    });
    if (i === breadcrumbs.length - 1) {
      pageTitle = item.name;
    }
  }

  return {
    list,
    pageTitle,
  };
};

export const makeCategoryFacetsResponse = async (response) => {
  if (!response) {
    return response;
  }

  const parentName = response?.name?.toLowerCase();
  const categories = response?.subcategories?.map((item) => {
    const categoryName = item?.name?.toLowerCase();
    return {
      id: item?.id,
      name: item?.name,
      url:
        (parentName === "tm" ? "" : "/tm") +
        `/${parentName}/${categoryName}/c/${item?.id}`,
    };
  });

  return categories;
};

export const makeProductStockResponse = async (response) => {
  if (!response) {
    return response;
  }
  const stockLevelStatus = response?.stock?.stockLevelStatus;
  return {
    stockLevel:
      stockLevelStatus === "inStock"
        ? configuration.inStockStatus
        : stockLevelStatus === "lowStock"
        ? configuration.lowStockStatus
        : configuration.outOfStockStatus,
    stockQty: response?.stock?.stockLevel,
  };
};

export const getSizeVariantFromProductDetail = (
  sizeItemVariants,
  productId
) => {
  const variants = [];
  for (let sizeOption of sizeItemVariants) {
    const stockLevelStatus = sizeOption?.stock?.stockLevelStatus;
    const variantOptionQualifier =
      sizeOption?.variantOptionQualifiers[1]?.name &&
      sizeOption?.variantOptionQualifiers[1]?.qualifier === "size"
        ? sizeOption?.variantOptionQualifiers[1]
        : null;
    variants.push({
      name: "size",
      code: sizeOption.code,
      selected: sizeOption.code == productId ? true : false,
      stock: {
        stockLevelStatus:
          stockLevelStatus === "inStock"
            ? configuration.inStockStatus
            : stockLevelStatus === "lowStock"
            ? configuration.lowStockStatus
            : configuration.outOfStockStatus,
      },
      url: sizeOption?.url?.replace(/TM/, "tm"),
      value: variantOptionQualifier?.value,
    });
  }

  return variants;
};
