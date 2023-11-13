import {
  breakPoints,
  breakpointBufferWidth,
  contentstackImageApiSource,
} from "../../../../lib/utils";
import { sharedConfigProps } from "../shared-props";

const ContentstackImage = ({ alt, src, className, maxFetchedWidth }) => {
  const mobileSrcSize = parseInt(breakPoints.bpMobile.slice(0, -2));

  const configProps = {
    src: `${contentstackImageApiSource(src)}${mobileSrcSize}`,
    ...sharedConfigProps({ className, alt }),
  };

  return (
    <picture>
      <SourceSets
        contentstackImageApiSource={contentstackImageApiSource(src)}
        maxFetchedWidth={maxFetchedWidth}
      />
      <img {...configProps} />
    </picture>
  );
};

function SourceSets({ contentstackImageApiSource, maxFetchedWidth }) {
  const imageSourceSets = Object.values(breakPoints)
    .filter((value) => {
      if (!maxFetchedWidth) return true;
      return parseInt(value.slice(0, -2)) < maxFetchedWidth;
    })
    .map((value) => {
      const srcSize = parseInt(value.slice(0, -2)) + breakpointBufferWidth;
      const source = {
        media: `(min-width: ${value})`,
        srcSet: `${contentstackImageApiSource}${srcSize}`,
      };
      return (
        <source
          media={source.media}
          srcSet={source.srcSet}
          key={source.srcSet}
        />
      );
    })
    .reverse();

  return imageSourceSets;
}

export default ContentstackImage;
