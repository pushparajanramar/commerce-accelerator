import Link from "next/link";
import React from "react";
import ProductPrice from "../../../../PLP/Products/ProductPrice";
import SingleImage from "../../../../PLP/Products/SingleImage";

function ProductListItem({ item }) {
  return (
    <li>
      <Link href={item?.url?.toLowerCase()} className="small-card">
        <div>
          <SingleImage
            src={item?.thumbImage}
            height={50}
            width={60}
            style={{ height: "auto" }}
            alt="Product image"
          />
        </div>
        <div className="product-info">
          <p className="p-sm">{item.title}</p>
          <div className="product-price ">
            <ProductPrice price={item.price} />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductListItem;
