"use client";
import PropTypes from "prop-types";
// import AddToCart from "./AddToCart";
import React, { useEffect, useState } from "react";
import ProductPrice from "../../PLP/Products/ProductPrice";
import PDPInventoryLevelAndQuantity from "./PDPInventoryLevelAndQuantity";
import { getProductStock } from "../../../lib/methods";

function PDPInventoryLevelQuantityAndAddToCartBox({
    price,
    productId,
    stockLevel,
    selectedVariant,
    availableForSale,
}) {
    const [quantity, setQuantity] = useState(1);
    const [stockObj, setStockObj] = useState({
        stockLevel,
        stockQty: 0,
    });

    const fetchProductStock = async () => {
        const stockResponse = await getProductStock({ productId });
        if (
            stockResponse.status === 200 &&
            stockResponse.response &&
            stockResponse.response.stockLevel
        ) {
            const response = stockResponse.response;
            setStockObj({
                stockLevel: response?.stockLevel,
                stockQty: response?.stockQty,
            });
        }
    };

    useEffect(() => {
        fetchProductStock();
    }, [productId]);

    return (
        <>
            <PDPInventoryLevelAndQuantity
                quantity={quantity}
                stockLevel={stockObj.stockLevel}
                stockQty={stockObj.stockQty}
                setQuantity={setQuantity}
            />
            <div>
                {/* <AddToCart
          price={price}
          quantity={quantity}
          productId={productId}
          selectedVariant={selectedVariant}
          availableForSale={availableForSale}
        /> */}
            </div>
        </>
    );
}

PDPInventoryLevelQuantityAndAddToCartBox.propTypes = {
    productId: PropTypes.string,
    availableForSale: PropTypes.bool,
    selectedVariant: PropTypes.string,
    price: ProductPrice.propTypes.price,
};

export default PDPInventoryLevelQuantityAndAddToCartBox;