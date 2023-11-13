import productData from "/components/Sitewide/Header/products.json";
import PDPProductDetails from "/components/PDP/PDPProductDetails";
import PDPProductImages from "/components/PDP/PDPProductImages";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PLPPage({
  product,
  productQuery,
  hybrisData,
  bloomreachData,
}) {
  const router = useRouter();
  const { category, subcategory, productType, id } = router.query;

  return (
    <>
      <div className="flex flex-col w-full md:w-2/3 gap-5 lg:flex-row plp-wrapper">
        <PDPProductImages
          thumbImage={bloomreachData?.response?.docs[0]?.thumb_image}
          images={hybrisData?.images}
          title={bloomreachData?.response?.docs[0]?.title}
        ></PDPProductImages>

        <div className="w-full lg:w-1/3 lg:pl-2.5 md:w-full">
        <PDPProductDetails
            productSizing={bloomreachData?.facet_counts?.facet_fields?.Sizes}
            title={bloomreachData?.response?.docs[0]?.title}
            price={bloomreachData?.response?.docs[0]?.price}
            description={bloomreachData?.response?.docs[0]?.description}
          ></PDPProductDetails>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = productData.response.docs;
  const paths = products.map((product) => ({
    params: {
      id: product?.url,
      category: "temp",
      subcategory: "temp",
      productType: "temp",
    },
  }));
  
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  } 

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const product = params.id;
  const hybrisQuery = await fetch(
    `https://hydev2.travismathew.com/restv2/v2/b2c-us/products/${params.id}?fields=FULL`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  const bloomReachQuery = fetch(
    `https://core.dxpapi.com/api/v1/core/api/v1/core/?account_id=${process.env.BLOOMREACH_ACCOUNT_ID}&auth_key=${process.env.BLOOMREACH_AUTH_KEY}&domain_key=${process.env.BLOOMREACH_DOMAIN_KEY}&url=${process.env.BLOOMREACH_URL}&request_type=search&search_type=keyword&q=${params.id}&rows=1&start=0&fl=pid,title,price,description,url,thumb_image,large_image,reviews,sale_price,swatch_image,fab_tech&fq&efq&sort`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  const bloomreachData = await bloomReachQuery;
  const hybrisData = await hybrisQuery;

  return { props: { product, bloomreachData, hybrisData }, 
  revalidate: 10};
}
