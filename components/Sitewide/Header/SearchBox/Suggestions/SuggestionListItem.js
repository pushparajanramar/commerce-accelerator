import route from "../../../../../constants/route";
import Link from "next/link";
import React, { useCallback } from "react";

function SuggestionListItem({ item, query }) {
  const highlightTxt = useCallback(
    (text) => {
      const fullStr = text?.toLowerCase();
      const keyword = query?.toLowerCase();
      const startIndex = fullStr.indexOf(keyword);
      const endIndex = startIndex + keyword.length || 0;
      if (startIndex === -1) {
        return text;
      }
      return (
        fullStr.substring(0, startIndex) +
        "<b>" +
        keyword +
        "</b>" +
        fullStr.substring(endIndex)
      );
    },
    [item.keyword, query]
  );

  return (
    <li>
      <Link href={route.searchPage + "?q=" + encodeURIComponent(item.keyword)}>
        <p
          className="p-sm"
          dangerouslySetInnerHTML={{ __html: highlightTxt(item.keyword) }}
        ></p>
      </Link>
    </li>
  );
}

export default SuggestionListItem;
