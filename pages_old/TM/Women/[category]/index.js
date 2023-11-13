import data from "/components/Sitewide/Header/taxonomies.json";
import PLPFilters from "/components/PLP/PLPFilters";
import PLPProductImages from "/components/PLP/PLPProductImages";
import React, { useEffect, useState } from "react";

export default function ProductPage({ product, productQuery }) {
  const listItems = productQuery?.response?.docs.map((product, i) => (
    <PLPProductImages product={product} key={i} />
  ));

  const [cartIndicator, setCartIndicator] = useState(0);

  return (
    <>
      
      <div className="grid grid-cols-4 gap-4 mx-8">
        <div className="col-span-4 sm:col-span-1 h-16 min-h-min">
          <div className="pdp-filters">
            <span className="text-5xl">{product?.name}</span>
            <div className=""><PLPFilters productQuery={productQuery} /></div>
            
          </div>
        </div>
        <div className="col-span-4 sm:col-span-3 h-64">
          <div className="pdp-controls ">
            <p>{productQuery?.response?.numFound} results - (ID: {product?.id})</p>
          </div>
          <div className="product-list grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {listItems}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  
  const paths = [];
  for (const category in data) {
        paths.push({
          params: {
            category: category,
            id: data[category].id
          },
        });
  }
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  //console.log('PATHS in GSP', params)
  const product = data[params.category].id;
  const query = fetch(
    `https://core.dxpapi.com/api/v1/core/?account_id=6449&auth_key=mk44kexhs4lt478w&domain_key=travismathew&url=https://www.travismathew.com&request_type=search&search_type=category&q=${product}&rows=200&start=0&fl=pid,title,price,url,thumb_image,variants, category, attributes&sort`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  const productQuery = await query;

  return { props: { product, productQuery } };
}
