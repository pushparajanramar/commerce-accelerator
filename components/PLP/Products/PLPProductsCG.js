"use client";
import React, { Fragment, useMemo, useState } from "react";
import ProductItem from "./ProductItem";
import ButtonWithLoading from "../../Elements/ButtonWithLoading";
import { useEffect } from "react";
import {
  getConfigOfProductsBasedOnKeywordResponse,
  getProductsBasedOnCategoryId,
} from "../../../lib/methods";
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
import { getSpecificLabel } from "../../../lib/Common";

function PLPProductsCG({
  response,
  numFound,
  showing,
  startPage,
  limit,
  query,
  selectedFilter,
  selectedSort,
  promoCards,
  categoryFacets,
}) {
  const [products, setProducts] = useState(response);
  const [pageInfo, setPageInfo] = useState({
    numFound,
    showing,
  });
  const [offset, setOffset] = useState(startPage);
  const {
    selected: selectedoption,
    loader: showLoader,
    sort,
  } = useSelector((state) => state.plpfilter);
  const dispatch = useDispatch();
  const PLPLabels = useSelector(selectPLPLabel);
  const updateOffset = (e) => {
    e.preventDefault();
    const noOfPage =
      pageInfo.numFound > 0 ? Math.ceil(pageInfo.numFound / limit) : 0;
    if (noOfPage > offset) {
      setOffset((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setProducts(response);
    dispatch(setTotalResult(numFound));
    setPageInfo({
      numFound,
      showing,
    });
    setOffset(startPage);

    if (selectedFilter && Object.entries(selectedFilter).length > 0) {
      dispatch(setSelectedOptions(selectedFilter));
    } else {
      dispatch(resetFilter());
    }

    if (selectedSort !== null) {
      dispatch(setSortBy(selectedSort));
    }
  }, [query, selectedFilter, selectedSort]);

  useEffect(() => {
    if (selectedoption !== null) {
      setOffset(0);
    } else if (sort !== null) {
      fetchProducts();
    }
  }, [selectedoption, sort]);

  useEffect(() => {
    console.log("offset fetchProducts useEffect");
    console.log("offset: ", offset);
    console.log("startPage: ", startPage);
    console.log("selectedoption: ", selectedoption);
    console.log("sort: ", sort);
    if (offset !== startPage) {
      console.log("offset !== startPage");
      fetchProducts();
    } else if (offset === 0 && selectedoption != null) {
      console.log("offset === 0 && selectedp[tion != null");
      fetchProducts();
    } else if (sort !== null) {
      console.log("sort !== null");
      fetchProducts();
    }
  }, [offset, startPage, selectedoption, sort]);

  const fetchProducts = async () => {
    try {
      dispatch(setLoader(true));
      const productResponse = await getProductsBasedOnCategoryId({
        categoryid: query,
        limit,
        start: offset * limit,
        filter: selectedoption,
        sort,
      });
      const {
        results: _results,
        numFound: _numfound,
        showing: _showing,
        startPage: _startPage,
        status,
        facets,
      } = await getConfigOfProductsBasedOnKeywordResponse(
        productResponse,
        limit,
        categoryFacets
      );

      if (status === 200) {
        setPageInfo({
          numFound: _numfound,
          showing: showing >= _numfound ? _numfound : _showing,
        });
        dispatch(setTotalResult(_numfound));
        if (facets) {
          dispatch(setOptions(facets));
        }
        // setOffset(_startPage)
        if (offset === 0) {
          setProducts([..._results]);
        } else {
          setProducts([...products, ..._results]);
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
                    "Loading"
                  )}...`}
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

export default PLPProductsCG;
