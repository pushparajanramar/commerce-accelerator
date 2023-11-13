"use client";
import { createAndConfirmWithFallbackImageSourceSets } from "./utils";
import {
  throttle,
  breakPoints,
  breakpointBufferWidth,
  contentstackImageApiSource,
} from "../../../lib/utils";
import React from "react";

const smaller = (a, b) => {
  if (!a) {
    return b;
  } else if (!b) {
    return a;
  } else {
    return Math.min(a, b);
  }
};
const pixelValToInt = (val) => parseInt(val.slice(0, -2));
function setImageSrc(imageObj) {
  if (!imageObj) return;
  imageObj.src = imageObj.url || imageObj.src;
}

const bpMobileAsInt = pixelValToInt(breakPoints.bpMobile);
const bpTabletAsInt = pixelValToInt(breakPoints.bpTablet);

const ContentstackImageSet = ({
  imageMobile,
  imageTablet,
  imageDesktop,
  className,
  maxFetchedWidth,
}) => {
  setImageSrc(imageMobile);
  setImageSrc(imageTablet);
  setImageSrc(imageDesktop);
  const {
    imageMobileWithFallback,
    imageTabletWithFallback,
    imageDesktopWithFallback,
  } = createAndConfirmWithFallbackImageSourceSets(
    imageMobile,
    imageTablet,
    imageDesktop
  );
  if (
    !imageMobileWithFallback ||
    !imageTabletWithFallback ||
    !imageDesktopWithFallback
  )
    return;
  const [alt, setAlt] = React.useState(setAltForWindow(0));
  const { src } = imageMobileWithFallback;

  const imageConfigProps = {
    src: `${contentstackImageApiSource(src)}${
      bpMobileAsInt + breakpointBufferWidth
    }`,
    alt: alt || "",
    loading: "lazy",
    className: `image-responsive  ${className ? className : ""}`,
  };

  function setAltForWindow(windowWidth) {
    let alt;
    if (windowWidth < bpMobileAsInt) {
      alt = imageMobileWithFallback.alt || "";
    } else if (windowWidth < bpTabletAsInt) {
      alt = imageTabletWithFallback.alt || "";
    } else {
      alt = imageDesktopWithFallback.alt || "";
    }
    return alt;
  }

  function updateAltTag() {
    setAlt(() => setAltForWindow(window.innerWidth));
  }

  React.useEffect(() => {
    setAlt(setAltForWindow(window.innerWidth));
    const throttledListener = throttle(updateAltTag, 1000);
    window.addEventListener("resize", () => {
      throttledListener();
    });
  }, []);

  return (
    <picture>
      <SourceSets
        imageMobile={imageMobileWithFallback}
        imageTablet={imageTabletWithFallback}
        imageDesktop={imageDesktopWithFallback}
        maxFetchedWidth={maxFetchedWidth}
      />
      <img {...imageConfigProps} />
    </picture>
  );
};

function SourceSets({
  imageMobile,
  imageTablet,
  imageDesktop,
  maxFetchedWidth,
}) {
  const imageSourceSets = Object.values(breakPoints)
    .map((value, idx) => {
      const valAsInt = pixelValToInt(value);
      const defaultSrcSize = valAsInt + breakpointBufferWidth;
      const srcSize = smaller(
        maxFetchedWidth + breakpointBufferWidth,
        defaultSrcSize
      );
      let setSource;
      if (valAsInt < bpMobileAsInt) {
        setSource = imageMobile.src;
      } else if (valAsInt < bpTabletAsInt) {
        setSource = imageTablet.src;
      } else {
        setSource = imageDesktop.src;
      }
      const source = {
        media: `(min-width: ${value})`,
        srcSet: `${contentstackImageApiSource(setSource)}${srcSize}`,
      };
      return (
        <source
          media={source.media}
          srcSet={source.srcSet}
          key={`${source.srcSet}_${idx}`}
        />
      );
    })
    .reverse();

  return imageSourceSets;
}

export default ContentstackImageSet;
