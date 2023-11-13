//***** PDPProductDetails *****//
// Description: PDP Product details (right rail)
// Usage: PDP
//****************//

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectLocale } from "/store/slices/langSlice";

const PDPProductDetails = ({ productSizing, title, price, description }) => {
  const siteLang = useSelector(selectLocale);
  const sizeList = productSizing?.map((size, i) => (
    <li key={i} className="col-span-1">
      <Link href={"/"}>{size.name}</Link>
    </li>
  ));

  return (
    <>
      <div className="pdp-product-details">
        <h1>{title}</h1>
        {siteLang == "en-US" ? <h3>${price}</h3> : <h3>C${price}</h3>}
        <div className="product-size">
          <ul className="grid gap-5 grid-cols-5 pdp-product-details-size p-md">
            {sizeList}
          </ul>
        </div>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </>
  );
};
export default PDPProductDetails;
