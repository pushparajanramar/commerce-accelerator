export const popupCenter = (url, title) => {
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;
  const width =
    window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  const height =
    window.innerHeight ??
    document.documentElement.clientHeight ??
    screen.height;

  const systemZoom = width / window.screen.availWidth;

  const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(
    url,
    title,
    `width=${500 / systemZoom},height=${550 / systemZoom
    },top=${top},left=${left}`
  );
  newWindow?.focus();
};

export function throttle(cb, delay) {
  let wait = false;
  let storedArgs = null;

  function checkStoredArgs() {
    if (storedArgs == null) {
      wait = false;
    } else {
      cb(...storedArgs);
      storedArgs = null;
      setTimeout(checkStoredArgs, delay);
    }
  }

  return (...args) => {
    if (wait) {
      storedArgs = args;
      return;
    }

    cb(...args);
    wait = true;
    setTimeout(checkStoredArgs, delay);
  };
}

import stylesBreakpoints from "../styles/global/breakpoints.module.scss";

// Ensure breakpoints are always provided to optimized image components which rely on them
export const breakPoints = {
  bpMobile: stylesBreakpoints.bpMobile || "414px",
  bpMobileWide: "767px",
  bpTablet: stylesBreakpoints.bpTablet || "1024px",
  bpDesktop: stylesBreakpoints.bpDesktop || "1440px",
  bpDesktopWide: "1920px",
};

// add to maxFetchedWidth to provide a little buffer on image resolution fetching as the window scales up toward the next breakpoint
export const breakpointBufferWidth = 350;

// play with image optimization quality levels here (0 - 100)
export const imageQualityPreset = 66;

// generate API source string for Contentstack image delivery API image sources
export const contentstackImageApiSource = (src) =>
  src.includes("?")
    ? `${src}&auto=webp&quality=${imageQualityPreset}&width=`
    : `${src}?auto=webp&quality=${imageQualityPreset}&width=`;

async function createFacetsForUI(facets) {
  const { colorGroups, sleeveLength, fabricTechnology, ...rest } = facets;
  return {
    ...rest,
    color: colorGroups !== null ? [...colorGroups] : [],
    "sleeve length": sleeveLength !== null ? [...sleeveLength] : [],
    "fabric & technology":
      fabricTechnology !== null ? [...fabricTechnology] : [],
  };
}
export async function prepareClientFacetsFromDataResponse(
  categoryFacetsError,
  categoryBasedProductFacets,
  categoryFacetsResponse
) {
  if (!categoryFacetsError && !categoryBasedProductFacets.errorMsg) {
    let facetsWithoutTypename = {};
    const categoryFacetsNoTypeName = categoryFacetsResponse.map(
      (categoryFacet) => {
        const { __typename, ...rest } = categoryFacet;
        return rest;
      }
    );
    facetsWithoutTypename["categories"] = categoryFacetsNoTypeName;
    const { __typename, ...rest } = categoryBasedProductFacets.response.facets;
    // const facetsWithUIFriendlyKeys = await createFacetsForUI(rest);
    const categoryBasedProductFacetsEntries = Object.entries(
      rest
    );
    categoryBasedProductFacetsEntries.forEach(([key, value]) => {
      const categoryBasedProductFacetsPruned = value
        ? value.map((facetsObj) => {
          const { __typename, ...rest } = facetsObj;
          return { ...rest };
        })
        : [];
      if (facetsWithoutTypename[key]) {
        const existingValue = facetsWithoutTypename[key];
        facetsWithoutTypename[key] = [
          ...existingValue,
          ...categoryBasedProductFacetsPruned,
        ];
      } else {
        facetsWithoutTypename[key] = [...categoryBasedProductFacetsPruned];
      }
    });
    return facetsWithoutTypename;
  }
  return {};
}
