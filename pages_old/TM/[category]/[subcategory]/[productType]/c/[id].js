import jsonData from "/components/Sitewide/Header/taxonomies.json";
import PLPProductImages from "/components/PLP/PLPProductImages";
import PLPFilters from "/components/PLP/PLPFilters";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SubcategoryPage({ product, productQuery }) {
  const router = useRouter();
  const { category, subcategory, productId, id } = router.query;

  // console.log('product id',productId);
  // console.log('category from ID',category);
  // console.log('subcategory from ID',subcategory);
  //const [category, setCategory] = useState('');

  const listItems = productQuery?.response?.docs.map((product, i) => (
    <PLPProductImages product={product} key={i} />
  ));

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mx-8">
        <div className="col-span-4 sm:col-span-1 h-16 min-h-min">
          <div className="pdp-filters">
            <span className="text-5xl">{product?.name}</span>
            <div className="">
              <PLPFilters
                productQuery={productQuery}
                cat={category}
                subcategory={subcategory}
              />
            </div>
          </div>
        </div>
        <div className="col-span-4 sm:col-span-3 h-64">
          <div className="pdp-controls ">
            <p>{productQuery?.response?.numFound} results</p>
          </div>
          <div className="product-list grid gap-5 grid-cols-2 lg:grid-cols-3">
            {listItems}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = [];

  Object.keys(jsonData).forEach((category) => {
    Object.keys(jsonData[category]).forEach((subcategory) => {
      Object.keys(jsonData[category][subcategory]).forEach((productType) => {
        const id =
          jsonData[category][subcategory][productType].id != undefined
            ? jsonData[category][subcategory][productType].id
            : "0001";
        //console.log('id', id);
        //setCategory(category);
        paths.push({
          params: {
            category,
            subcategory,
            productType,
            id,
          },
        });
      });
    });
  });
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
  return {
    paths,
    fallback: false,
  };
}

//Recursive?
// function generatePaths(category, basePath = '') {
//   const paths = [];

//   // If the category has an "id" property, generate a path for it
//   if (category.id) {
//     const path = `${basePath}/c/${category.id}`;
//     paths.push({ params: { slug: path.split('/') } });
//   }

//   // If the category has subcategories, generate paths for them recursively
//   if (category && typeof category === 'object') {
//     for (const [key, value] of Object.entries(category)) {
//       // Skip "id" and "name" properties
//       if (key !== 'id' && key !== 'name') {
//         const subcategoryPath = `${basePath}/${key}`;
//         const subcategoryPaths = generatePaths(value, subcategoryPath);
//         paths.push(...subcategoryPaths);
//       }
//     }
//   }

//   return paths;
// }

export async function getStaticProps({ params }) {
  //console.log('params in static prosp =================', params);
  const product = params.id;
  //const product = {id:'0445'};
  const query = fetch(
    `https://core.dxpapi.com/api/v1/core/?account_id=6449&auth_key=mk44kexhs4lt478w&domain_key=travismathew&_br_uid_2=&url=https://www.documentation-site.com&ref_url=https://localhost&request_id=&request_type=search&search_type=category&q=${product}&rows=200&start=0&fl=pid,title,price,description,url,brand,thumb_image&sort&fq&efq`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  const productQuery = await query;

  return { props: { product, productQuery }, revalidate: 10 };
}
