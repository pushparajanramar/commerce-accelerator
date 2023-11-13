import Cookies from "js-cookie";
import configuration from "../constants/configuration";
import errorMsg from "../constants/errorMsg";
import { addToCart, createCart, getGuestToken, retrieveCart } from "./methods";

export function _debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function ascendingSort(arr) {
  return arr
    .slice()
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

export function isValidImageURL(str) {
  if (typeof str !== "string") return false;
  const url = str.toLocaleLowerCase();
  const urlWithoutQuery =
    url.lastIndexOf("?") >= 0 ? url.substring(0, url.lastIndexOf("?")) : url;
  return !!urlWithoutQuery.match(
    /\w+\.(jpg|jpeg|gif|webp|avif|png|tiff|bmp)$/gi
  );
}

export function isValidVideoURL(str) {
  if (typeof str !== "string") return false;
  const url = str.toLocaleLowerCase();
  const urlWithoutQuery =
    url.lastIndexOf("?") >= 0 ? url.substring(0, url.lastIndexOf("?")) : url;
  return !!urlWithoutQuery.match(/\w+\.(mp4|avi|mpg|webm|ogg|flv|m4p)$/gi);
}

export function serialize(obj) {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(
        "fq=" + encodeURIComponent(p + ":") + encodeURIComponent(obj[p])
      );
    }
  return str.join("&");
}

export function createSerializeFilter(filters) {
  if (filters === null || Object.entries(filters).length === 0) {
    return "";
  }

  const params = {};
  for (let [key, value] of Object.entries(filters)) {
    if (value.length > 1) {
      const valueArr = value.map((item) => `"${item}"`);
      params[key] = `(${valueArr.join(" OR ")})`;
    } else {
      params[key] = `"${value[0]}"`;
    }
  }
  return serialize(params);
}

export function createColorVariantBasedOnBloomreach(colorStyles) {
  return colorStyles?.split("|").map((ele) => {
    const eleArr = ele.split(",");
    const obj = {};
    for (let i = 0; i < eleArr.length; i++) {
      const split = eleArr[i].split("=");
      if (split.length > 1) {
        const keyIndex = split[0].trim();
        if (
          ["SwatchImage", "PrimaryImage"].includes(keyIndex) &&
          !split[1].includes("http")
        ) {
          obj[keyIndex] =
            configuration.colorSwatchBaseURLBloomreach + split[1].trim();
        } else {
          obj[keyIndex] = split[1].trim();
        }
      }
    }
    return obj;
  });
}

export function createColorVariantBasedOnOCC(colorStyles) {
  const baseImgUrl = configuration.baseImageURL;
  return colorStyles?.map((colorOption) => {
    const imgUrl = colorOption.variantOptionQualifiers[0]?.image?.url;
    if (imgUrl) {
      return {
        code: colorOption.code,
        stock: colorOption.stock?.stockLevelStatus,
        url: colorOption.url.toLowerCase(),
        name: colorOption.variantOptionQualifiers[0]?.name,
        image: !imgUrl?.includes("http") ? baseImgUrl + imgUrl : imgUrl,
      };
    }
  });
}
export function createSizeVariantBasedOnOCC(colorStyles) {
  return colorStyles?.map((item) => {
    const sizeValue =
      item.variantOptionQualifiers[1].qualifier &&
      item.variantOptionQualifiers[1].qualifier == "size"
        ? item.variantOptionQualifiers[1].value
        : null;
    if (sizeValue) {
      return {
        code: item.code,
        stock: item.stock?.stockLevelStatus,
        url: item.url?.toLowerCase(),
        name: sizeValue,
      };
    }
  });
}

export function getSpecificLabel(source, word, fallback = word) {
  return source[word] ? source[word] : fallback;
}
export function getValidationMessageByType(source, validationType) {
  if (source && Array.isArray(source)) {
    const response = source.filter(
      (ele) => ele.validation_type === validationType
    )?.[0];
    if (response) {
      return response?.validation_message;
    }
  }
  return null;
}
export function getResponseMessageByCode(source, responseCode) {
  if (source && Array.isArray(source)) {
    const response = source.filter(
      (ele) => ele.response_code === responseCode
    )?.[0];
    if (response) {
      return response?.message;
    }
  }
  return null;
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export async function createBearerToken() {
  const tokenData =
    localStorage &&
    localStorage.hasOwnProperty(configuration.hybrisTokenCookieName)
      ? localStorage.getItem(configuration.hybrisTokenCookieName)
      : null;
  if (tokenData) {
    return tokenData?.toString();
  }

  const tokenResponse = await getGuestToken(); // For Guest Token
  if (
    tokenResponse.status === 200 &&
    tokenResponse.response &&
    tokenResponse.response.access_token
  ) {
    if (localStorage) {
      localStorage.setItem(
        configuration.hybrisTokenCookieName,
        tokenResponse.response.access_token
      );
    }
    return tokenResponse.response.access_token;
  }
  throw new Error(errorMsg.failedToCreateToken);
}

export async function createUserCart({ user, bearerToken }) {
  const cartId =
    Cookies && Cookies.get(configuration.cartCookieGuiName)
      ? Cookies.get(configuration.cartCookieGuiName)
      : null;
  if (cartId) {
    return cartId;
  }

  const cartResponse = await createCart({
    user,
    bearerToken,
  }); // For Guest Token
  if (
    cartResponse.status === 200 &&
    cartResponse.response &&
    cartResponse.response.code
  ) {
    let userCartId = cartResponse.response.guid;
    if (user !== configuration.guestUserName) {
      userCartId = cartResponse.response.code;
    }
    removeCartFromCookie();
    Cookies.set(configuration.cartCookieGuiName, userCartId);
    Cookies.set(configuration.cartCookieName, cartResponse.response.guid);
    return userCartId;
  }
  throw new Error(errorMsg.failedToCreateCart);
}

export async function handleAddToCart({
  productCode,
  qty = 1,
  user = configuration.guestUserName,
}) {
  try {
    //  Token
    let bearerToken = null;
    if (user !== configuration.guestUserName) {
      bearerToken = await createBearerToken();
    }
    // Cart creation
    const cartId = await createUserCart({ user, bearerToken });
    // Add to cart
    const response = await addToCart({
      user,
      bearerToken,
      guid: cartId,
      productCode,
      qty,
    });
    if (response.status === 200) {
      return response;
    } else {
      const errorType = response?.response?.errors[0]?.type;
      const errorReason = response?.response?.errors[0]?.reason;
      if (errorType === "InvalidTokenError" || response?.status === 401) {
        if (
          localStorage &&
          localStorage.hasOwnProperty(configuration.hybrisTokenCookieName)
        ) {
          localStorage.removeItem(configuration.hybrisTokenCookieName);
        }
        return await handleAddToCart({ productCode, qty, user });
      } else if (errorReason && errorReason === "notFound") {
        removeCartFromCookie();
        return await handleAddToCart({ productCode, qty, user });
      } else {
        throw new Error(errorMsg.failedToAddProduct);
      }
    }
  } catch (ex) {
    throw new Error(errorMsg.failedToAddProduct);
  }
}

export function toTitleCase(str) {
  str = str?.toLowerCase();
  return str?.replace(/(^|\s)\S/g, function (t) {
    return t.toUpperCase();
  });
}

export function removeCartFromCookie() {
  if (Cookies.get(configuration.cartCookieName)) {
    Cookies.remove(configuration.cartCookieName);
  }
  if (Cookies.get(configuration.cartCookieGuiName)) {
    Cookies.remove(configuration.cartCookieGuiName);
  }
}

export async function handleRetrieveCartDetail({
  user = configuration.guestUserName,
}) {
  try {
    //  Token
    let bearerToken = null;
    if (user !== configuration.guestUserName) {
        bearerToken = await createBearerToken();
      }
    // Cart creation
    const cartId = await createUserCart({ user, bearerToken });
    // retrieve cart
    const response = await retrieveCart({ user, bearerToken, cartId });

    if (response.status === 200) {
      return response;
    } else {
      const errorType = response?.response?.errors[0]?.type;
      if (errorType === "InvalidTokenError") {
        if (
          localStorage &&
          localStorage.hasOwnProperty(configuration.hybrisTokenCookieName)
        ) {
          localStorage.removeItem(configuration.hybrisTokenCookieName);
        }
        return await handleRetrieveCartDetail({ user });
      } else {
        throw new Error(errorMsg.failedToAddProduct);
      }
    }
  } catch (ex) {
    throw new Error(errorMsg.failedToAddProduct);
  }
}
