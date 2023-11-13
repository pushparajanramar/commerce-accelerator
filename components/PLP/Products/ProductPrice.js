import React from "react";
import PropTypes from "prop-types";
import configuration from "../../../constants/configuration";

function ProductPrice({ price }) {
  const initialPriceObj = {
    currencyIso: configuration.currencyIso,
    formattedValue: configuration.currencySymbol + "0",
    value: 0,
  };
  const salePriceObj = price.filter((item) => item.priceType === "sale_price");
  const salePrice =
    salePriceObj && salePriceObj[0] ? salePriceObj[0] : initialPriceObj;
  const normalPriceObj = price.filter((item) => item.priceType === "price");
  const normalPrice =
    normalPriceObj && normalPriceObj[0] ? normalPriceObj[0] : initialPriceObj;
  // const employeePrice = price.filter(item => item.priceType === 'employee_price')

  return (
    <>
      <p
        className={`p-xs price ${
          salePrice.value !== normalPrice.value && " discount"
        } `}
      >
        <span className="discount-price">{salePrice.formattedValue}</span>
        {salePrice.value !== normalPrice.value && (
          <span className="price strike">{normalPrice.formattedValue}</span>
        )}
      </p>
    </>
  );
}
ProductPrice.propTypes = {
  price: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      currencyIso: PropTypes.string,
      formattedValue: PropTypes.string,
      priceType: PropTypes.string,
      value: PropTypes.number,
    })
  ),
};
export default ProductPrice;
