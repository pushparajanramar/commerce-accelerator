import { breakPoints, breakpointBufferWidth } from "../../../lib/utils";
import Image from "next/image";
import ContentstackImage from "./ContentstackImage/ContentstackImage";
import { sharedConfigProps } from "./shared-props";

const OptimizedImage = ({ alt, src, className, maxFetchedWidth }) => {
  const sizes = Object.values(breakPoints)
    .reverse()
    .map((value) => {
      const valAsNum = parseInt(value.slice(0, -2));
      const srcSize =
        maxFetchedWidth && valAsNum > maxFetchedWidth
          ? maxFetchedWidth + breakpointBufferWidth
          : valAsNum + breakpointBufferWidth;
      return `(min-width: ${value}) ${srcSize}px`;
    })
    .filter((val) => val !== null);

  const configProps = {
    sizes: sizes,
    src: src,
    height: 41,
    width: 41,
    ...sharedConfigProps({ className, alt }),
  };

  const sanitizedSrc = src ? src.toLowerCase() : "";
  let isContentstackImage = sanitizedSrc.includes("contentstack")
    ? true
    : false;

  return isContentstackImage ? (
    <ContentstackImage
      alt={alt}
      src={src}
      className={className}
      maxFetchedWidth={maxFetchedWidth}
    />
  ) : (
    <Image {...configProps} />
  );
};

export default OptimizedImage;
