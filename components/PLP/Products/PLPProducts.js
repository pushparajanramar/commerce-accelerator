"use client";
export const dynamic = "force-dynamic";
import React, { Fragment, useMemo, useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import ButtonWithLoading from "../../Elements/ButtonWithLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilter,
  setLoader,
  setOptions,
  setSelectedOptions,
  setSortBy,
  setTotalResult,
} from "../../../store/slices/PLPFilterSlice";
import { Button } from "../../Elements/Button";
import { selectPLPLabel } from "../../../store/slices/labelsSlice";
import { createSerializeFilter, getSpecificLabel } from "../../../lib/Common";
import configuration from "../../../constants/configuration";
import { CATEGORY_BASED_PRODUCT } from "../../../app/tm/[...params]/queries";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { PromoCard } from "../PromoCard";

const limit = configuration.PLPPageProductCardLimit;
function PLPProducts({
  query,
  selectedFilter,
  selectedSort,
  promoCards,
  facets,
}) {
  const {
    data: { categoryBasedProducts },
    refetch,
  } = useSuspenseQuery(CATEGORY_BASED_PRODUCT, {
    variables: {
      categoryBasedProductParams: {
        categoryId: query,
        filters: createSerializeFilter(selectedFilter),
        limit,
        start: 0,
        sort: selectedSort || "",
      },
    },
  });

  const [products, setProducts] = useState(
    !categoryBasedProducts.errorMsg ? categoryBasedProducts.response.docs : []
  );
  const [pageInfo, setPageInfo] = useState({
    numFound: !categoryBasedProducts.errorMsg
      ? categoryBasedProducts.response.total
      : 0,
    showing: !categoryBasedProducts.errorMsg
      ? categoryBasedProducts.response.start + limit
      : 0,
    startPage: !categoryBasedProducts.errorMsg
      ? categoryBasedProducts.response.start + 1
      : 0,
  });
  /**
   * when component is first mount on the initial fetch response.start = 0
   */
  const [offset, setOffset] = useState(
    !categoryBasedProducts.errorMsg ? categoryBasedProducts.response.start : 0
  );
  const {
    selected: selectedOption,
    loader: showLoader,
    sort,
  } = useSelector((state) => state.plpfilter);
  const dispatch = useDispatch();
  const PLPLabels = useSelector(selectPLPLabel);

  useEffect(() => {
    dispatch(
      setTotalResult(
        !categoryBasedProducts.errorMsg
          ? categoryBasedProducts.response.total
          : 0
      )
    );
    if (Object.keys(selectedFilter).length) {
      /**
       * filter query param (fq) structure
       * fq={%22design%22:[%22Heathered%22,%22Chest%20Stripes%22],%22color_groups%22:[%22blue%22,%22grey%22]}&sort=price%20asc
       * */
      dispatch(setSelectedOptions(selectedFilter));
    } else {
      dispatch(resetFilter());
    }

    if (selectedSort !== null) {
      dispatch(setSortBy(selectedSort));
    }
  }, [selectedFilter, selectedSort]);

  useEffect(() => {
    if (selectedOption !== null) {
      //When selectedOption not in default state whether user clear all filter or add new option in filter
      setOffset(0);
    } else if (sort !== null) {
      //when offset greater then zero and change sort option
      fetchProducts();
    }
  }, [selectedOption, sort]);

  useEffect(() => {
    //if more products requested (offset > 0) -> fetch more
    if (offset > 0) {
      fetchProducts();
    } else if (offset === 0 && selectedOption !== null) {
      /**
       * selectedOptions had a different value than the store defaultState value(null),
       * and
       * selectedOptions was cleared(set to {}) by an user action or as a side effect
       */
      fetchProducts();
    } else if (sort !== null) {
      // sort order was cleared or there is a sort order
      fetchProducts();
    }
  }, [offset, selectedOption, sort]);

  const updateOffset = (e) => {
    e.preventDefault();
    const noOfPage =
      pageInfo.numFound > 0 ? Math.ceil(pageInfo.numFound / limit) : 0;
    if (noOfPage > offset) {
      setOffset((prev) => {
        return prev + 1;
      });
    }
  };
  const fetchProducts = async () => {
    try {
      dispatch(setLoader(true));
      const filters = createSerializeFilter(selectedOption);
      const {
        data: { categoryBasedProducts: categoryBasedProductsRefetch },
      } = await refetch({
        categoryBasedProductParams: {
          categoryId: query,
          filters,
          limit,
          start: offset * limit,
          sort: sort || "",
        },
      });
      if (categoryBasedProductsRefetch.status === 200) {
        // adding 1 to account for offset being 0 when pageInfo.startPage is 1
        const currentlyShowing = (offset + 1) * limit;
        setPageInfo((currentPageInfo) => ({
          numFound: categoryBasedProductsRefetch.response.total,
          showing:
            currentlyShowing >= categoryBasedProductsRefetch.response.total
              ? categoryBasedProductsRefetch.response.total
              : currentlyShowing,
          startPage: currentPageInfo.startPage + 1,
        }));
        dispatch(setTotalResult(categoryBasedProductsRefetch.response.total));
        let refetchFacets = categoryBasedProductsRefetch?.response?.facets;
        if (refetchFacets) {
          if (facets.categories) {
            refetchFacets = { categories: facets.categories, ...refetchFacets };
          }
          dispatch(setOptions(refetchFacets));
        }
        if (offset === 0) {
          setProducts([...categoryBasedProductsRefetch.response.docs]);
        } else {
          setProducts([
            ...products,
            ...categoryBasedProductsRefetch.response.docs,
          ]);
        }
      }
      dispatch(setLoader(false));
    } catch (ex) {
      dispatch(setLoader(false));
    }
  };
  return (
    <div className="product-grid">
      <div className="no-of-results">
        {pageInfo.numFound}{" "}
        <span>{getSpecificLabel(PLPLabels, "results", "Results")}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-4 lg:gap-8 ">
        {products?.map((product, index) => {
          const colorVariants = product?.variants?.filter(
            (item) => item.name === "color"
          );
          const sizeVariants = product?.variants?.filter(
            (item) => item.name === "size"
          );
          const checkPromoCard = promoCards?.filter(
            (ele) => ele.index_position == index + 1
          );

          const productData = {
            ...product,
            url: product.url,
            colorVariants,
            defaultSizes: sizeVariants,
          };

          if (checkPromoCard && checkPromoCard.length > 0) {
            return (
              <Fragment key={"product" + product.productId + index}>
                <PromoCard data={checkPromoCard[0]} />
                <ProductItem
                  product={productData}
                  key={"product" + product.productId + index}
                />
              </Fragment>
            );
          }

          return (
            <ProductItem
              product={productData}
              key={"product" + product.productId + index}
            />
          );
        })}
      </div>
      <div className="load-more">
        {pageInfo.numFound !== 0 &&
          pageInfo.numFound !== null &&
          pageInfo.numFound > pageInfo.showing && (
            <>
              <span>
                {getSpecificLabel(PLPLabels, "showing", "Showing")}{" "}
                {pageInfo.showing} of {pageInfo.numFound}
              </span>
              {showLoader ? (
                <ButtonWithLoading
                  label={`${getSpecificLabel(
                    PLPLabels,
                    "loading",
                    "Loading..."
                  )}`}
                />
              ) : (
                <Button
                  type="secondary-black"
                  label={getSpecificLabel(PLPLabels, "load_more", "Load More")}
                  onClick={updateOffset}
                />
              )}
            </>
          )}
      </div>
    </div>
  );
}

export default PLPProducts;
