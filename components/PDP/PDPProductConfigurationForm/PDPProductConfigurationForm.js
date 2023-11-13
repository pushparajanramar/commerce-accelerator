"use client";
import React from "react";
import PropTypes from "prop-types";
import PDPInventoryLevelQuantityAndAddToCartBox from "./PDPInventoryLevelQuantityAndAddToCartBox";
import configuration from "../../../constants/configuration";
import { selectSizeChartLabel } from "../../../store/slices/labelsSlice";
import { useSelector } from "react-redux";
import PDPColorAndSize from "./PDPColorAndSize";

function PDPProductConfigurationForm({
  Size,
  title,
  price,
  Color,
  codes,
  productId,
  stockLevel,
  sizeVariant,
  colorVariant,
  selectedSize,
  selectedColor,
}) {
  const selectedVariant = selectedSize && selectedColor;
  const availableForSale = [
    configuration.inStockStatus,
    configuration.lowStockStatus,
  ].includes(stockLevel);
  const sizeChartsRes = useSelector(selectSizeChartLabel);
  const sizeCharts = sizeChartsRes;

  return (
    <div className="pdp-config-section">
      <PDPColorAndSize codes={codes} sizeCharts={sizeCharts} />
      <div className="w1">
        <PDPInventoryLevelQuantityAndAddToCartBox
          price={price}
          productId={productId}
          stockLevel={stockLevel}
          selectedVariant={selectedVariant}
          availableForSale={availableForSale}
        />
      </div>
    </div>
  );
}

PDPProductConfigurationForm.propTypes = {
  title: PropTypes.string,
  productId: PropTypes.string,
  stockLevel: PropTypes.string,
};

export default PDPProductConfigurationForm;
