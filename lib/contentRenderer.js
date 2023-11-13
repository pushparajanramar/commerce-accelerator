// contentRenderer.js
import parse from "html-react-parser";
import React from "react";

const supportedTags = ["h1", "h2", "h3", "h4", "h5", "span", "p"];

function getValidTagName(text) {
  if (text) {
    for (const tag of supportedTags) {
      const regex = new RegExp(`^<${tag}.*?>.*?</${tag}>$`, "i");
      if (regex.test(text.trim())) {
        return tag;
      }
    }
  }
  return null;
}

export function extractInnerContent(text, tag) {
  const regex = new RegExp(`<${tag}.*?>(.*?)</${tag}>`, "i");
  const match = regex.exec(text.trim());
  return match && match[1] ? match[1] : text;
}

export const renderRichTextField = (content, defaultTag = "p") => {
  const tagName = getValidTagName(content);

  if (tagName) {
    // Extract the inner content to prevent nested tags
    const innerContent = extractInnerContent(content, tagName);
    return React.createElement(tagName, {}, parse(innerContent));
  }

  // If it's not a valid tag or doesn't match any of the specified tags,
  // use the default tag provided as an argument:
  return React.createElement(defaultTag, {}, content);
};
