"use client";

import Link from "next/link";
import React, { Fragment, useState } from "react";
import SingleImage from "../Products/SingleImage";
import { useSelector } from "react-redux";
import { selectPLPLabel } from "../../../store/slices/labelsSlice";
import { getSpecificLabel } from "../../../lib/Common";

const RelatedProducts = ({ relatedProducts }) => {
  const toggleShowFull = (product) => {
    product.showFull = !product.showFull;
    setProducts([...products]);
  };

  const initialRelatedProducts = relatedProducts.map((product) => ({
    ...product,
    showFull: false,
  }));

  const [products, setProducts] = useState(initialRelatedProducts);
  const PLPLabels = useSelector(selectPLPLabel)

  return (
    <div className="related-products">
      <h2>{getSpecificLabel(PLPLabels, 'related_products', 'Related Products')}</h2>
      <div className="related-products-card">
        {products?.length > 0 &&
          products.map((eachProduct, index) => (
            <section className="list-items" key={'rl-product' + index}>
              <Link href={eachProduct?.url}>
                <SingleImage
                  width={300}
                  height={300}
                  src={eachProduct?.media?.url}
                  alt={eachProduct?.media?.altText}
                />
              </Link>
              <h3 className="product-name">{eachProduct?.title?.toLowerCase()}</h3>
              <div
                className={` ${eachProduct.showFull ? "show-full" : "show-less"
                  }`}
              >
                <p className="card-description"> {eachProduct.showFull ? eachProduct?.description : eachProduct.shortDescription + '...'}</p>
              </div>
              <button
                onClick={() => toggleShowFull(eachProduct)}
                className="tm-button text-link"
               
              > 
              <strong>
                {eachProduct.showFull ? getSpecificLabel(PLPLabels, 'show_less', "Show Less") : getSpecificLabel(PLPLabels, 'show_more', "Show more")}
               </strong>
              </button>
            </section>
          ))}
      </div>
    </div >
  );
};

export default RelatedProducts;
