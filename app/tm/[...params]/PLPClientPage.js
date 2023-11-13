import Breadcrumb from "../../../components/Sitewide/Breadcrumb/Breadcrumb";
import FilterNav from "../../../components/PLP/Products/Filters/FilterNav";
import configuration from "../../../constants/configuration";
import PLPProducts from "../../../components/PLP/Products/PLPProducts";
import RelatedAll from "../../../components/PLP/Related/RelatedAll";
import {
  BREADCRUMBS,
  CATEGORY_FACETS,
  CATEGORY_BASED_PRODUCT_FACETS,
} from "./queries";
import { getClient } from "../../../lib/apollo-client";
import { getPageInformation } from "../../../lib/methods";
import { prepareClientFacetsFromDataResponse } from "../../../lib/utils";
import { createSerializeFilter } from "@/lib/Common";
import React from "react";
import PLPComponentLoop from "@/components/Layouts/PLPComponentLoop";
import { extractReferencedModularBlocks } from "@/lib/factories";

// export const revalidate = 1000
export async function getContentStackPageData(categoryId, searchParams) {
  return await getPageInformation({
    pageName: "plp_page",
    pageData: { categoryId, searchParams },
  });
}
async function PLPClientPage({
  parameters,
  searchParams,
  routePath,
  pathname,
}) {
  const categoryId = parameters[parameters.length - 1].toUpperCase();

  // Product API Fetching

  const filters =
    searchParams.fq && searchParams.fq !== {}
      ? JSON.parse(searchParams.fq)
      : {};

  const sortOrder =
    searchParams.sort && searchParams.sort !== null ? searchParams.sort : null;
  const {
    data: { breadcrumbDetails },
  } = await getClient().query({
    query: BREADCRUMBS,
    variables: {
      categoryId,
    },
  });
  const {
    data: { categoryBasedProducts: categoryBasedProductFacets },
  } = await getClient().query({
    query: CATEGORY_BASED_PRODUCT_FACETS,
    variables: {
      categoryBasedProductParams: {
        categoryId,
        filters: createSerializeFilter(filters),
        sort: "",
        limit: configuration.PLPPageProductCardLimit,
        start: 0,
      },
      fetchPolicy: "no-cache",
    },
  });
  const {
    data: { categoryFacets },
  } = await getClient().query({
    query: CATEGORY_FACETS,
    variables: {
      categoryId,
    },
  });
  const currentIndex = parameters.indexOf("c");
  const beforeParams = parameters.slice(0, currentIndex);
  const limit = configuration.PLPPageProductCardLimit;

  const category = beforeParams[beforeParams.length - 1];

  const facets = await prepareClientFacetsFromDataResponse(
    categoryFacets.errorMsg,
    categoryBasedProductFacets,
    categoryFacets.response
  );

  // Contentstack Fetching

  let promoCards = [];
  let aboveGridContent = {};
  let belowGridContent = {};
  let forceShowRelatedProducts = true;

  const plpPageData = await getContentStackPageData(categoryId, searchParams);
  let PLPPageResponse = {};
  if (
    plpPageData.status === 200 &&
    plpPageData.response &&
    plpPageData.response.length > 0
  ) {
    PLPPageResponse = plpPageData.response[0] ? plpPageData.response[0] : {};

    aboveGridContent.modular_blocks = PLPPageResponse.above_grid_content;
    aboveGridContent = extractReferencedModularBlocks(aboveGridContent);

    belowGridContent.modular_blocks = PLPPageResponse.below_grid_content;
    belowGridContent = extractReferencedModularBlocks(belowGridContent);
    forceShowRelatedProducts = !belowGridContent.modular_blocks.find(
      (modularBlock) => modularBlock.related_products
    );

    promoCards = PLPPageResponse?.promo_cards
      ? PLPPageResponse?.promo_cards
      : [];
  }

  return (
    <>
      <Breadcrumb
        list={
          !breadcrumbDetails.errorMsg ? breadcrumbDetails.response.list : []
        }
      />

      <section className="tm-width">
        <h1 className="category">
          {!breadcrumbDetails.errorMsg
            ? breadcrumbDetails.response.pageTitle
            : category}
        </h1>
      </section>

      {aboveGridContent.modular_blocks && (
        <PLPComponentLoop
          componentData={aboveGridContent}
          key="above_grid_components"
        />
      )}

      <div className="py-4">
        <FilterNav facets={facets} />
      </div>

      <section className="tm-width">
        <PLPProducts
          selectedFilter={filters}
          selectedSort={sortOrder}
          query={categoryId}
          promoCards={promoCards}
          facets={facets}
        />

        {forceShowRelatedProducts && <RelatedAll />}
        {belowGridContent.modular_blocks && (
          <PLPComponentLoop
            componentData={belowGridContent}
            key="below_grid_components"
          />
        )}
      </section>
    </>
  );
}

export default PLPClientPage;
