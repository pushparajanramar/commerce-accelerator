"use client"
import React, { useState, useEffect } from "react";
import RelatedItems from "./RelatedItems";
import RelatedCategories from "./RelatedCategories";
import RelatedProducts from "./RelatedProducts";
import { usePathname } from "next/navigation";
import { getFetchRelatedItems } from "../../../lib/methods";

function RelatedAll({ relatedItems = [], relatedCategories = [], relatedProducts = [] }) {
  const [data, setData] = useState({
    relatedItems,
    relatedCategories,
    relatedProducts
  })
  const pathName = usePathname()

  const getRelatedItemsResponse = async () => {
    const producturl = process.env.NEXT_PUBLIC_APP_TRAVISMATHEW_URL + pathName
    const response = await getFetchRelatedItems({
      producturl,
    });
    if (response && response.status === 200) {
      const relatedItemsResponse = response?.response
      const relatedItems = relatedItemsResponse?.relatedItems;
      const relatedCategories = relatedItemsResponse?.relatedCategories;
      const relatedProducts = relatedItemsResponse?.relatedProducts;
      setData({
        relatedItems,
        relatedCategories,
        relatedProducts
      })
    }
  }

  useEffect(() => {
    getRelatedItemsResponse()
  }, [pathName])

  return (
    <section className="tm-height">
      {data.relatedItems && data.relatedItems.length > 0 && (
        <RelatedItems relatedItems={data.relatedItems} />
      )}
      {data.relatedCategories && data.relatedCategories.length > 0 && (
        <RelatedCategories relatedCategories={data.relatedCategories} />
      )}
      {data.relatedProducts && data.relatedProducts.length > 0 && (
        <RelatedProducts relatedProducts={data.relatedProducts} />
      )}
    </section>
  );
}

export default RelatedAll;
