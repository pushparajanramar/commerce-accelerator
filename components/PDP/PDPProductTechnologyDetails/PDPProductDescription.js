import React from "react";

function PDPProductDescription({ description, product }) {
  return <div className="p-sm" dangerouslySetInnerHTML={{ __html: description }}></div>;
}

export default PDPProductDescription;
