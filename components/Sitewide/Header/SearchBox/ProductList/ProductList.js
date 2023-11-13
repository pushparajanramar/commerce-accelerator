import React from "react";
import ProductListItem from "./ProductListItem";

function ProductList({ products }) {
  return (
    <ul className="product-list">
      {products?.slice(0, 4).map((item) => {
        return <ProductListItem key={item.productId} item={item} />;
      })}
    </ul>
  );
}

export default ProductList;
