import catalogs from "/components/Sitewide/Header/catalog.json";
import React, { useEffect, useState } from "react";

export default function PLPFilters({ productQuery, cat, subcategory }) {
  const [categoryList, setCategory] = useState([]);

  useEffect(() => {
    const url = getEntryUrlById("0445");
    console.log(url);
  }, []);

  //get category (men, women) from slug, pass product list of product ids as props, combine, use that to create the link url and the menu

  function getEntryUrlById(id) {
    let arr = [];
    for (const catalog of catalogs.catalogs) {
      for (const version of catalog.catalogVersions) {
        if (version.id === id) {
          return version.url;
        }
        for (const category of version.categories) {
          console.log("category", category);
          arr.push(category);
          if (category.id === id) {
            setCategory(arr);
            return `${cat}/${subcategory}${category.url}`;
          }
        }
      }
    }

    return null; // if id is not found
  }

  const listItems = productQuery?.facet_counts?.facet_fields?.Sizes.map(
    (facet, i) => (
      <li key={i}>
        {facet.name} - {facet.count}
      </li>
    )
  );

  return (
    <ul className="listing-categories">
      [WIP]
      {/* {listItems} */}
    </ul>
  );
}
