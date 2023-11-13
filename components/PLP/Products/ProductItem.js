"use client";
import Link from "next/link";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import ProductImages from "./ProductImages";
import ProductPrice from "./ProductPrice";

import configuration from "../../../constants/configuration";
import { fetchProductDetails } from "../../../lib/methods";
import QuickAdd from "./QuickAdd";
import ColorOptions from "./ColorOptions";
import { handleAddToCart, handleRetrieveCartDetail } from "../../../lib/Common";
import { useSelector, useDispatch } from "react-redux";
import { selectUserEmail } from "@/store/slices/authSlice";
import { setCartCount } from "@/store/slices/cartSlice";

const getProductDetail = async (_productId) => {
  return await fetchProductDetails(_productId);
};

function ProductItem({ product, isStoryBook = false }) {
  const [images, setImages] = useState(null);
  const [sizeVariants, setSizeVariants] = useState([]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showSizeLoaderBtn, setShowSizeLoaderBtn] = useState(false);
  const [showSizeOption, setShowSizeOption] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isGloveProduct, setIsGloveProduct] = useState(product?.isGloveProduct);
  const [handOptions, setHandOptions] = useState([]);
  const [productUrl, setProductUrl] = useState(product?.url);
  const allImages = product.images;
  const userEmail = useSelector(selectUserEmail)
  const dispatch = useDispatch();
  const itemsRef = useRef([]);

  useEffect(() => {
    if (
      !selectedColor &&
      product?.colorVariants &&
      product?.colorVariants &&
      product?.colorVariants[0]
    ) {
      if (product?.defaultSizes && product.defaultSizes.length > 0) {
        const productSizing = product?.defaultSizes ? product.defaultSizes : [];
        const productHandOptions = product?.handOptions
          ? product.handOptions
          : [];
        setSelectedColor(product?.colorVariants[0]);
        setSizeVariants(productSizing);
        setHandOptions(productHandOptions);
      } else {
        handleChangeImageBasedOnColor(product?.colorVariants[0], "in");
      }
    }
  }, [selectedColor, product.productId]);

  // Helper function to get images with correct URLs
  const getProcessedImages = (productImages) => {
    return productImages?.map((item) => {
      return {
        ...item,
        url: item.url.includes("http")
          ? item.url
          : configuration.baseImageURL + item.url,
      };
    });
  };

  // Helper function to get product sizing
  const getProductSizing = (productVariants) => {
    return productVariants?.filter((item) => item.name === "size") ?? [];
  };

  const handleChangeImageBasedOnColor = async (colorItem, status) => {
    // Early return if status is not 'in'
    if (status !== "in") {
      setImages(allImages);
      setShowSizeLoaderBtn(false);
      return;
    }

    setSelectedColor(colorItem);

    if (!isStoryBook) {
      setSizeVariants([]);
      setShowSizeLoaderBtn(true);
    }

    try {
      const productResponse = await getProductDetail(colorItem.code);

      // Early return if response status is not 200
      if (productResponse.status !== 200) {
        setShowSizeLoaderBtn(false);
        return;
      }

      const newProduct = productResponse.response;
      const images = getProcessedImages(newProduct?.images);
      const productSizing = getProductSizing(newProduct?.variants);
      const productHandOptions = newProduct?.handOptions
        ? newProduct.handOptions
        : [];
      setSizeVariants(productSizing);
      setShowSizeLoaderBtn(false);
      //For globe product
      setHandOptions(productHandOptions);
      setIsGloveProduct(newProduct?.isGloveProduct);
      //Set Product url
      setProductUrl(newProduct?.url)

      if (images) {
        setImages(images);
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      setShowSizeLoaderBtn(false);
    }
  };

  const handleSizeClickOption = async (e, item) => {
    ///for cart functionality purpose
    try {
      const user = userEmail ? userEmail : configuration.guestUserName
      const addRes = await handleAddToCart({ productCode: item.code, qty: 1, user });

      if (addRes?.status == 200) {
        const retrieveCartResponse = await handleRetrieveCartDetail({ user });
        // Update the ref value directly
        itemsRef.current = retrieveCartResponse;
      }
      const cartItemsCount = itemsRef.current?.response?.totalItems;
      dispatch(setCartCount(cartItemsCount));
    } catch (ex) { }
  };

  const handleQuickAddBtn = (status) => {
    if (status === false) {
      setShowSizeOption(false);
      setShowQuickAdd(false);
    } else {
      setShowQuickAdd(true);
      setShowSizeOption(false);
    }
  };

  const handleShowSizeOption = (status) => {
    if (status === false) {
      setShowSizeOption(false);
      setShowQuickAdd(true);
    } else {
      if (sizeVariants) {
        setShowSizeOption(true);
      } else {
        setShowSizeOption(false);
        setShowQuickAdd(false);
      }
    }
  };

  return (
    <div className="product-item-list">
      {product.badge && (
        <span className="product-badge p-sm">
          {product.badge?.toLowerCase()}
        </span>
      )}
      <div
        className="w1"
        onMouseEnter={() => handleQuickAddBtn(true)}
        onMouseLeave={() => handleQuickAddBtn(false)}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ProductImages
            hasProductBadge={product?.badge}
            url={productUrl}
            images={images ?? allImages}
            title={product.title}
          />
        </Suspense>
        {showQuickAdd && (
          <QuickAdd
            showSizeLoaderBtn={showSizeLoaderBtn}
            showSizeOption={showSizeOption}
            sizeVariants={sizeVariants}
            handOptions={handOptions}
            isGloveProduct={isGloveProduct}
            handleSizeClickOption={handleSizeClickOption}
            handleShowSizeOption={handleShowSizeOption}
          />
        )}
      </div>
      <div className="product-details">
        <p className="p-sm">{product?.brand}</p>
        <div className="product-name">
          <Link href={productUrl}>{product.title}</Link>
        </div>
        <ProductPrice price={product.price} />
        <div className="color-palette">
          {product.colorVariants && (
            <>
              <div className="color-md">
                <ColorOptions
                  handleChangeImageBasedOnColor={handleChangeImageBasedOnColor}
                  options={product.colorVariants}
                  productUrl={productUrl}
                  viewport={"mobile"}
                />
              </div>
              <div className="color-xl">
                <ColorOptions
                  handleChangeImageBasedOnColor={handleChangeImageBasedOnColor}
                  options={product.colorVariants}
                  productUrl={productUrl}
                  viewport={"desktop"}
                />
              </div>
            </>
          )}
        </div>
        <p className="p-xs">{product?.promotionText}</p>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    price: ProductPrice.propTypes.price,
    promotion: PropTypes.string,
    brand: PropTypes.string,
    url: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    badge: PropTypes.string,
    images: PropTypes.array.isRequired,
    defaultSizes: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string,
        stock: PropTypes.object,
        url: PropTypes.string,
      })
    ),
  }),
  isStoryBook: PropTypes.bool,
  isGloveProduct: PropTypes.bool,
};

export default ProductItem;
