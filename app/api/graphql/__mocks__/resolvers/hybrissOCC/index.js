import {
  mockedCartsResponse,
  mockedAnonymousCartResponse,
  mockedLoggedInCartResponse,
  mockedAnonymousCartEntriesResponse,
  mockedLoggedInCartEntriesResponse,
  mockedHybrisClientTokenResponse,
  mockedAnonymousCreateCartResponse,
  mockedLoggedInCreateCartResponse,
  mockedAnonymousAddProductToCartResponse,
  mockedLoggedInAddProductToCartResponse,
  mockedMergeCartResponse,
  mockedUpdateCartResponse,
} from "../../datasources/hybrisOCC";

export const mockedProductDetailsResolverResponse = {
  status: 200,
  errorMsg: null,
  response: {
    productId: "1MY348_9HGR_M",
    baseProduct: "1MY348_9HGR_",
    title: "ANNUAL LEAVE FULL ZIP HOODIE",
    description:
      "<p>When you require comfort and style that performs, our Heater Tech Hoodies deliver. Crafted from a lightweight, textured fabric with a slightly scooped hem, the ANNUAL LEAVE full-zip hoodie provides the performance features you need in the modern look you want.</p><ul><li>Heater Tech Hoodie </li><li>Zipper closure pockets</li><li>New side gusset construction</li><li>Half elastic cuffs</li></ul>",
    url: "/tm/tops/hoodies-and-sweatshirts/annual-leave-full-zip-hoodie/p/1MY348_9HGR_M",
    brand: "",
    badge: "",
    isGloveProduct: false,
    isGiftProduct: false,
    handOptions: [],
    price: [
      {
        currencyIso: "USD",
        formattedValue: "$159.95",
        priceType: "sale_price",
        value: 159.95,
      },
      {
        currencyIso: "USD",
        formattedValue: "$159.95",
        priceType: "price",
        value: 159.95,
      },
      {
        currencyIso: "USD",
        formattedValue: "$159.95",
        priceType: "employee_price",
        value: 159.95,
      },
    ],
    stock: {
      stockLevelStatus: "instock",
    },
    images: [
      {
        altText: "1MY348_9HGR.jpg",
        isVideoMedia: false,
        galleryIndex: 0,
        url: "https://hydev3.travismathew.com/medias/sys_master/images/images/haf/hf3/9235759726622/1MY348-9HGR.jpg",
      },
      {
        altText: "1MY348_9HGR_2.jpg",
        isVideoMedia: false,
        galleryIndex: 1,
        url: "https://hydev3.travismathew.com/medias/sys_master/images/images/h84/h27/9235760185374/1MY348-9HGR-2.jpg",
      },
      {
        altText: "1MY348_9HGR_3.jpg",
        isVideoMedia: false,
        galleryIndex: 2,
        url: "https://hydev3.travismathew.com/medias/sys_master/images/images/hf3/ha3/9235760644126/1MY348-9HGR-3.jpg",
      },
      {
        altText: "1MY348_9HGR_4.jpg",
        isVideoMedia: false,
        galleryIndex: 3,
        url: "https://hydev3.travismathew.com/medias/sys_master/images/images/hd0/h50/9235761102878/1MY348-9HGR-4.jpg",
      },
    ],
    promotionText: "",
    sizeAndFitDescription:
      "Models featured are an average of 6'1\", 180 lbs seen wearing a size M",
    variants: [
      {
        name: "color",
        code: "1MY348_9HGR_",
        selected: true,
        stock: {
          stockLevelStatus: "instock",
        },
        url: "/tm/tops/hoodies-and-sweatshirts/annual-leave-full-zip-hoodie/p/1MY348_9HGR_",
        value: "HEATHER GREY",
        media: {
          altText: "1MY348_9HGR_SWATCH.jpg",
          isVideoMedia: false,
          url: "https://hydev3.travismathew.com/medias/sys_master/images/images/h2f/hca/9235759923230/1MY348-9HGR-SWATCH.jpg",
        },
      },
      {
        name: "size",
        code: "1MY348_9HGR_2XL",
        selected: false,
        stock: {
          stockLevelStatus: "instock",
        },
        url: "/tm/tops/hoodies-and-sweatshirts/annual-leave-full-zip-hoodie/p/1MY348_9HGR_2XL",
        value: "2XL",
      },
      {
        name: "size",
        code: "1MY348_9HGR_3XL",
        selected: false,
        stock: {
          stockLevelStatus: "instock",
        },
        url: "/tm/tops/hoodies-and-sweatshirts/annual-leave-full-zip-hoodie/p/1MY348_9HGR_3XL",
        value: "3XL",
      },
      {
        name: "size",
        code: "1MY348_9HGR_L",
        selected: false,
        stock: {
          stockLevelStatus: "instock",
        },
        url: "/tm/tops/hoodies-and-sweatshirts/annual-leave-full-zip-hoodie/p/1MY348_9HGR_L",
        value: "L",
      },
    ],
    fabricType: "",
    fabricCareDescription: "Polyester  / Cotton / Spandex",
    descriptionIcons: [],
    breadcrumbs: {
      list: [
        {
          url: "/",
          title: "HOME",
          code: "01",
          isActive: false,
        },
        {
          url: "/tm/tops/c/013",
          title: "TOPS",
          code: "013",
          isActive: false,
        },
        {
          url: "/tm/tops/hoodies-and-sweatshirts/c/0138",
          title: "Hoodies and Sweatshirts",
          code: "0138",
          isActive: false,
        },
        {
          url: "/tm/tops/hoodies-and-sweatshirts/annual-leave-full-zip-hoodie/p/1my348_",
          title: "ANNUAL LEAVE FULL ZIP HOODIE",
          code: "",
          isActive: true,
        },
      ],
      pageTitle: "ANNUAL LEAVE FULL ZIP HOODIE",
    },
    imageAndText: [],
    videoAndText: [],
    categories: [
      {
        code: "0138",
        url: "/TM/TOPS/Hoodies-and-Sweatshirts/c/0138",
      },
      {
        code: "01293",
        url: "/TM/FEATURED/Heater-Series/c/01293",
      },
      {
        code: "013",
        url: "/TM/TOPS/c/013",
      },
      {
        code: "0134",
        url: "/TM/TOPS/Outerwear/c/0134",
      },
      {
        code: "001",
        url: "/Mens/c/001",
      },
      {
        code: "01",
        url: "/TM/c/01",
      },
    ],
  },
};
export const mockedBreadcrumbDetailsResolverResponse = {
  status: 200,
  errorMsg: null,
  response: {
    list: [
      {
        code: "01",
        isActive: false,
        title: "HOME",
        url: "/",
      },
      {
        code: "013",
        isActive: false,
        title: "TOPS",
        url: "/tm/tops/c/013",
      },
      {
        code: "0133",
        isActive: true,
        title: "Button-Ups",
        url: "/tm/tops/button-ups/c/0133",
      },
    ],
    pageTitle: "Button-Ups",
  },
};

export const mockedCategoryFacetsResolverResponse = {
  errorMsg: null,
  status: 200,
  response: [
    {
      id: "0131",
      name: "Polos",
      url: "/tm/button-ups/polos/c/0131",
    },
    {
      id: "0138",
      name: "Hoodies and Sweatshirts",
      url: "/tm/button-ups/hoodies and sweatshirts/c/0138",
    },
    {
      id: "0132",
      name: "Tees",
      url: "/tm/button-ups/tees/c/0132",
    },
    {
      id: "0135",
      name: "Shop All",
      url: "/tm/button-ups/shop all/c/0135",
    },
    {
      id: "0133",
      name: "Button-Ups",
      url: "/tm/button-ups/button-ups/c/0133",
    },
    {
      id: "0134",
      name: "Outerwear",
      url: "/tm/button-ups/outerwear/c/0134",
    },
    {
      id: "0139",
      name: "Quarter Zips",
      url: "/tm/button-ups/quarter zips/c/0139",
    },
  ],
};

export const mockedCartsResolverResponse = {
  status: 200,
  errorMsg: null,
  response: mockedCartsResponse,
};

export const mockedAnonymousCartResolverResponse = {
  errorMsg: null,
  status: 200,
  response: mockedAnonymousCartResponse,
};

export const mockedLoggedInCartResolverResponse = {
  errorMsg: null,
  status: 200,
  response: mockedLoggedInCartResponse,
};

export const mockedAnonymousCartEntriesResolverResponse = {
  errorMsg: null,
  status: 200,
  response: mockedAnonymousCartEntriesResponse,
};

export const mockedLoggedInCartEntriesResolverResponse = {
  errorMsg: null,
  status: 200,
  response: mockedLoggedInCartEntriesResponse,
};

export const mockedHybrisClientTokenResolverResponse = {
  status: 200,
  errorMsg: null,
  response: mockedHybrisClientTokenResponse,
};

export const mockedCreateCartAnonymousResolverResponse = {
  status: 200,
  errorMsg: null,
  response: mockedAnonymousCreateCartResponse,
};

export const mockedCreateCartLoggedInResolverResponse = {
  status: 200,
  errorMsg: null,
  response: mockedLoggedInCreateCartResponse,
};

export const mockedAnonymousAddProductToCartResolverResponse = {
  status: 200,
  errorMsg: null,
  response: mockedAnonymousAddProductToCartResponse,
};

export const mockedLoggedInAddProductToCartResolverResponse = {
  status: 200,
  errorMsg: null,
  response: mockedLoggedInAddProductToCartResponse,
};

export const mockedMergeCartResolverResponse = {
  status: 200,
  errorMsg: null,
  response: mockedMergeCartResponse,
};

export const mockedUpdateCartResolverResponse = {
  status: 200,
  errorMsg: null,
  response: mockedUpdateCartResponse,
};
export const mockedProductStockDetailsResolverResponse = {
  status: 200,
  errorMsg: null,
  response: {
    stockLevel: "instock",
    stockQty: 0,
  },
};
export const mockedEmailSubscriptionResolverResponse = {
  status: 200,
  errorMsg: null,
  response: "",
};
